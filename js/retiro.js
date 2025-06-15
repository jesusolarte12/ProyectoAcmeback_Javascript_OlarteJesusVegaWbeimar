document.addEventListener("DOMContentLoaded", function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuario) {
        alert('Sesión expirada. Por favor inicia sesión.');
        window.location.href = "../html/inicio-sesion.html";
        return;
    }

    const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
    document.querySelector(".user-details h3").textContent = nombreCompleto;

    const fecha = new Date(usuario.fechaCreacion);
    const fechaFormateada = fecha.toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    document.querySelector('.user-details p').textContent = fechaFormateada;

    const avatar = document.querySelector(".user-avatar");
    if (avatar) {
        const iniciales = `${usuario.nombre[0]}${usuario.apellidos[0]}`.toUpperCase();
        avatar.textContent = iniciales;
    }

    document.getElementById("numeroCuenta").textContent = usuario.numeroId;
    document.getElementById("nombreTitular").textContent = nombreCompleto;

    const form = document.getElementById("formRetiro");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const monto = parseFloat(document.getElementById("monto").value);

        if (monto <= 0) {
            mensaje.textContent = "El valor debe ser mayor a 0.";
            mensaje.style.color = "red";
            return;
        }

        if (monto > usuario.saldo) {
            mensaje.textContent = "Saldo insuficiente.";
            mensaje.style.color = "red";
            return;
        }

        const db = firebase.database();
        const refUsuarios = db.ref("usuarios");

        try {
            const fechaTransaccion = new Date().toISOString();
            const refId = Math.floor(Math.random() * 1e10).toString();

            const transaccion = {
                fecha: fechaTransaccion,
                referencia: refId,
                tipo: "retiro",
                descripcion: "Retiro",
                valor: -Math.abs(monto)
            };

            const transacciones = usuario.transacciones || {};
            transacciones[refId] = transaccion;

            const nuevoSaldo = usuario.saldo - monto;

            await refUsuarios.child(usuario.numeroId).update({
                saldo: nuevoSaldo,
                transacciones: transacciones
            });

            usuario.saldo = nuevoSaldo;
            usuario.transacciones = transacciones;
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

            mensaje.textContent = "Retiro realizado con éxito.";
            mensaje.style.color = "green";
            form.reset();

        } catch (error) {
            console.error(error);
            mensaje.textContent = "Error al realizar el retiro.";
            mensaje.style.color = "red";
        }
    });
});

function logout() {
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../html/inicio-sesion.html";
}
