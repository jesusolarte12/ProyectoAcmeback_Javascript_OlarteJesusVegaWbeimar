document.addEventListener("DOMContentLoaded", function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        alert('Sesión expirada. Por favor inicia sesión.');
        window.location.href = "../html/inicio-sesion.html";
        return;
    }

    const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
    document.getElementById("numeroCuenta").textContent = usuario.numeroId;
    document.getElementById("nombreTitular").textContent = nombreCompleto;

    const form = document.getElementById("formRetiro");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const cuentaDestino = document.getElementById("cuentaDestino").value.trim();
        const monto = parseFloat(document.getElementById("monto").value);

        if (cuentaDestino === usuario.numeroId) {
            mensaje.textContent = "No puedes consignarte a tu propia cuenta.";
            mensaje.style.color = "red";
            return;
        }

        const db = firebase.database();
        const refUsuarios = db.ref("usuarios");

        try {
            const snapshot = await refUsuarios.once("value");

            if (!snapshot.hasChild(cuentaDestino)) {
                mensaje.textContent = "La cuenta destino no existe.";
                mensaje.style.color = "red";
                return;
            }

            const cuentaDestinoData = snapshot.child(cuentaDestino).val();
            const fechaTransaccion = new Date().toISOString();
            const refId = Math.floor(Math.random() * 1e10).toString();

            // Transacción para quien envía
            const transaccionOrigen = {
                fecha: fechaTransaccion,
                referencia: refId,
                tipo: "consignación",
                descripcion: "Consignación por canal electrónico",
                valor: -Math.abs(monto)
            };

            // Transacción para quien recibe
            const transaccionDestino = {
                fecha: fechaTransaccion,
                referencia: refId,
                tipo: "consignación",
                descripcion: "Consignación por canal electrónico",
                valor: Math.abs(monto)
            };

            // Actualizar origen (usuario actual)
            const transaccionesOrigen = usuario.transacciones || {};
            transaccionesOrigen[refId] = transaccionOrigen;
            const nuevoSaldoOrigen = usuario.saldo - monto;

            await refUsuarios.child(usuario.numeroId).update({
                saldo: nuevoSaldoOrigen,
                transacciones: transaccionesOrigen
            });

            // Actualizar localStorage
            usuario.saldo = nuevoSaldoOrigen;
            usuario.transacciones = transaccionesOrigen;
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

            // Actualizar destino
            const transaccionesDestino = cuentaDestinoData.transacciones || {};
            transaccionesDestino[refId] = transaccionDestino;
            const nuevoSaldoDestino = parseFloat(cuentaDestinoData.saldo || 0) + monto;

            await refUsuarios.child(cuentaDestino).update({
                saldo: nuevoSaldoDestino,
                transacciones: transaccionesDestino
            });

            mensaje.textContent = "Consignación realizada con éxito.";
            mensaje.style.color = "green";
            form.reset();
        } catch (error) {
            console.error(error);
            mensaje.textContent = "Error al realizar la consignación.";
            mensaje.style.color = "red";
        }
    });
});
