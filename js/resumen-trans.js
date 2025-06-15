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

    // ✅ Mostrar número de cuenta real (numeroId)
    if (usuario.numeroId) {
        items[0].querySelector(".valor").textContent = usuario.numeroId;
    }

    items[1].querySelector(".valor").textContent = nombreCompleto;

    const hoy = new Date();
    const hace10Dias = new Date(hoy);
    hace10Dias.setDate(hoy.getDate() - 9);

    const formatDate = (d) => d.toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
    }).replace('.', '');

    items[2].querySelector(".valor").textContent = `${formatDate(hace10Dias)} - ${formatDate(hoy)}`;

    const saldoFormateado = `$${usuario.saldo.toLocaleString('es-CO', { minimumFractionDigits: 2 })} COP`;
    items[3].querySelector(".valor").textContent = saldoFormateado;

    // ✅ Mostrar transacciones en la tabla
    if (usuario.transacciones) {
        const transacciones = Object.values(usuario.transacciones);
        transacciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        const ultimas10 = transacciones.slice(0, 10);

        const tbody = document.querySelector(".transactions-table tbody");
        tbody.innerHTML = "";

        ultimas10.forEach(tx => {
            const fechaObj = new Date(tx.fecha);
            const fechaTexto = fechaObj.toLocaleDateString('es-CO', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const horaTexto = fechaObj.toLocaleTimeString('es-CO', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            const valorFormateado = `$${Math.abs(tx.valor).toLocaleString('es-CO')}`;
            const signo = tx.valor < 0 ? '-' : '+';
            const claseMonto = tx.valor < 0 ? 'monto-negativo' : 'monto-positivo';

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="fecha">${fechaTexto}<br><span>${horaTexto}</span></td>
                <td class="ref-number">${tx.referencia || '---'}</td>
                <td><span class="tipo-transaccion">${capitalizar(tx.tipo || '')}</span></td>
                <td class="descripcion">${tx.descripcion || ''}</td>
                <td class="${claseMonto}">${signo}${valorFormateado}</td>
            `;
            tbody.appendChild(fila);
        });
    }
});

function logout() {
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../html/inicio-sesion.html";
}

function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
