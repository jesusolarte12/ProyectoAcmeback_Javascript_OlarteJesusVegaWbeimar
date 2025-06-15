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

    // Transacciones
    const transacciones = usuario.transacciones || {};
    const contenedorTransacciones = document.getElementById("transaccionesRecientes");

    // Convertir objeto a arreglo y ordenar por fecha descendente
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
});

function logout() {
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../html/inicio-sesion.html";
}
