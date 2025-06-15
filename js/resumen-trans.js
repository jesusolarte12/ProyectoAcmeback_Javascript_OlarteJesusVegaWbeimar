function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

function imprimir() {
    window.print();
}

document.addEventListener('click', function (event) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function () {
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

    const items = document.querySelectorAll(".summary-grid .items");

    items[1].querySelector(".valor").textContent = nombreCompleto;

    const hoy = new Date();
    const hace10Dias = new Date(hoy);
    hace10Dias.setDate(hoy.getDate() - 9);

    const formatDate = (d) => d.toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
    }).replace('.', '');

    items[2].querySelector(".valor").textContent = `${formatDate(hace10Dias)} - ${formatDate(hoy)}`;

    const saldoFormateado = `$${usuario.saldo.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
    items[3].querySelector(".valor").textContent = saldoFormateado;
});

function logout() {
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../html/inicio-sesion.html";
}