function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navMenu && menuToggle) {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            const navMenu = document.getElementById('navMenu');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navMenu && menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navMenu && menuToggle) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

    if (!usuario) {
        alert('Sesión expirada. Por favor inicia sesión.');
        window.location.href = "../html/inicio-sesion.html";
        return;
    }

    // Actualizar nombre de usuario
    const userName = document.getElementById('userName');
    if (userName) {
        const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
        userName.textContent = nombreCompleto;
    }

    // Actualizar avatar
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) {
        const iniciales = `${usuario.nombre[0] || ''}${usuario.apellidos[0] || ''}`.toUpperCase();
        userAvatar.textContent = iniciales;
    }

    // Actualizar fecha de creación
    const userDate = document.querySelector('.user-details p');
    if (userDate && usuario.fechaCreacion) {
        const fecha = new Date(usuario.fechaCreacion);
        userDate.textContent = fecha.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    // Mostrar saldo
    const balanceMonto = document.querySelector('.balance-monto');
    if (balanceMonto) {
        const saldo = usuario.saldo || 0;
        balanceMonto.textContent = `$${saldo.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
    }

    // Mostrar transacciones recientes
    const contenedorTransacciones = document.getElementById("transaccionesRecientes");
    if (contenedorTransacciones) {
        const transacciones = usuario.transacciones || {};
        const transaccionesArray = Object.values(transacciones).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        const ultimas4 = transaccionesArray.slice(0, 4);

        ultimas4.forEach(tx => {
            const fechaTx = new Date(tx.fecha);
            const fechaFormateadaTx = fechaTx.toLocaleDateString('es-CO', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });

            const item = document.createElement("div");
            item.className = "transaction-item";

            item.innerHTML = `
                <div class="transaction-info">
                    <h4>${tx.descripcion}</h4>
                    <p>${tx.origen || "Sistema"} - ${fechaFormateadaTx}</p>
                </div>
                <div class="transaction-amount ${tx.valor < 0 ? 'negative' : 'positive'}">
                    ${tx.valor < 0 ? '-' : '+'}$${Math.abs(tx.valor || 0).toLocaleString('es-CO')}
                </div>
            `;

            contenedorTransacciones.appendChild(item);
        });
    }
});

function logout() {
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../html/inicio-sesion.html";
}
