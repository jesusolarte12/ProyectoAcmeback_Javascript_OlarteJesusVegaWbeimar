function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.getElementById('navMenu').classList.remove('active');
            document.querySelector('.menu-toggle').classList.remove('active');
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('navMenu').classList.remove('active');
        document.querySelector('.menu-toggle').classList.remove('active');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

    if (!usuario) {
        alert('Sesión expirada. Por favor inicia sesión.');
        window.location.href = "../html/inicio-sesion.html";
        return;
    }

    const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
    document.getElementById('userName').textContent = nombreCompleto;

    const iniciales = `${usuario.nombre[0] || ''}${usuario.apellidos[0] || ''}`.toUpperCase();
    document.getElementById('userAvatar').textContent = iniciales;

    const fecha = new Date(usuario.fechaCreacion);
    const fechaFormateada = fecha.toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    document.querySelector('.user-details p').textContent = fechaFormateada;

    const saldo = usuario.saldo || 0;
    const saldoFormateado = `$${saldo.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
    document.querySelector('.balance-monto').textContent = saldoFormateado;
});

function logout() {
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../html/inicio-sesion.html";
}
