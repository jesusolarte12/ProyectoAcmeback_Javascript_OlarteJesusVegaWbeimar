document.addEventListener("DOMContentLoaded", function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuario) {
        alert("Sesión expirada. Por favor inicia sesión.");
        window.location.href = "../html/inicio-sesion.html";
        return;
    }

    const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
    const fecha = new Date(usuario.fechaCreacion);
    const fechaFormateada = fecha.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    document.getElementById("userName").textContent = nombreCompleto;
    document.getElementById("userFecha").textContent = fechaFormateada;
    document.getElementById("userAvatar").textContent = `${usuario.nombre[0]}${usuario.apellidos[0]}`.toUpperCase();

    document.getElementById("textoCertificado").innerHTML = `
        ACME Bank certifica que el(la) señor(a) <strong>${nombreCompleto}</strong>, 
        identificado(a) con número de identificación <strong>${usuario.numeroId}</strong>, 
        posee una cuenta activa en nuestra entidad.
    `;

    document.getElementById("numeroCuenta").textContent = usuario.numeroId;
    document.getElementById("fechaApertura").textContent = fechaFormateada;
});

function imprimir() {
    window.print();
}
