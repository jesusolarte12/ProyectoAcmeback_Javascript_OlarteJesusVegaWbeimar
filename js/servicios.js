document.addEventListener("DOMContentLoaded", function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        alert('Sesión expirada. Por favor inicia sesión.');
        window.location.href = "../html/inicio-sesion.html";
        return;
    }

    // Mostrar datos del usuario
    const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
    document.getElementById("numeroCuenta").textContent = usuario.numeroId;
    document.getElementById("nombreTitular").textContent = nombreCompleto;

    const btnPagar = document.getElementById("btnPagar");
    const mensaje = document.getElementById("mensajePago");

    btnPagar.addEventListener("click", async function () {
        const servicio = document.getElementById("servicio").value;
        const valor = parseFloat(document.getElementById("valor").value);

        if (isNaN(valor) || valor <= 0) {
            mensaje.textContent = "El valor debe ser un número positivo.";
            mensaje.style.color = "red";
            return;
        }

        if (valor > usuario.saldo) {
            mensaje.textContent = "Fondos insuficientes para realizar el pago.";
            mensaje.style.color = "red";
            return;
        }

        try {
            const db = firebase.database();
            const refUsuarios = db.ref("usuarios");

            const fechaTransaccion = new Date().toISOString();
            const refId = Math.floor(Math.random() * 1e10).toString();

            const transaccion = {
                fecha: fechaTransaccion,
                referencia: refId,
                tipo: "servicio",
                descripcion: `Pago de servicio de ${servicio}`,
                valor: -Math.abs(valor)
            };

            const transacciones = usuario.transacciones || {};
            transacciones[refId] = transaccion;
            const nuevoSaldo = usuario.saldo - valor;

            await refUsuarios.child(usuario.numeroId).update({
                saldo: nuevoSaldo,
                transacciones: transacciones
            });

            // Actualizar localStorage
            usuario.saldo = nuevoSaldo;
            usuario.transacciones = transacciones;
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

            mensaje.textContent = "Pago realizado con éxito.";
            mensaje.style.color = "green";

            document.getElementById("valor").value = "";
        } catch (error) {
            console.error(error);
            mensaje.textContent = "Error al realizar el pago.";
            mensaje.style.color = "red";
        }
    });
});
