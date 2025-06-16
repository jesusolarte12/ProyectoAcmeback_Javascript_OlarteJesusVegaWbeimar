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

    const fechaFormateada = new Date().toLocaleDateString('es-CO');
    const fechaElement = document.querySelector('.user-details p');
    if (fechaElement) {
        fechaElement.textContent = fechaFormateada;
    }

    const avatar = document.querySelector(".user-avatar");
    if (avatar) {
        const iniciales = `${usuario.nombre[0]}${usuario.apellidos[0]}`.toUpperCase();
        avatar.textContent = iniciales;
    }

    document.getElementById("mes").addEventListener("click", function () {
        mostrarSelectorMesAnio();
    });

    document.getElementById("anual").addEventListener("click", function () {
        mostrarSelectorAnio();
    });

    document.getElementById("todos").addEventListener("click", function () {
        generarExtractoCompleto();
    });
});


function mostrarSelectorMesAnio() {
    const selector = document.createElement("div");
    selector.innerHTML = `
        <label>Seleccione mes:</label>
        <select id="mesSeleccionado">
            ${[...Array(12)].map((_, i) => `<option value="${i}">${i + 1}</option>`).join('')}
        </select>
        <br>
        <label>Seleccione año:</label>
        <input type="number" id="anioSeleccionado" min="2000" max="2025" value="${new Date().getFullYear()}">
        <button id="generarExtractoMes">Generar</button>
    `;
    mostrarModal("Extracto Mensual", selector);

    document.getElementById("generarExtractoMes").addEventListener("click", function () {
        const mes = parseInt(document.getElementById("mesSeleccionado").value);
        const anio = parseInt(document.getElementById("anioSeleccionado").value);
        cerrarModal();

        generarExtractoFiltrado(
            fecha => fecha.getMonth() === mes && fecha.getFullYear() === anio,
            `Extracto de ${mes + 1}/${anio}`
        );
    });
}

function mostrarSelectorAnio() {
    const selector = document.createElement("div");
    selector.innerHTML = `
        <label>Año:</label>
        <input type="number" id="anioSeleccionado" min="2000" max="2099" value="${new Date().getFullYear()}">
        <button id="generarExtractoAnual">Generar</button>
    `;
    mostrarModal("Extracto Anual", selector);

    document.getElementById("generarExtractoAnual").addEventListener("click", function () {
        const anio = parseInt(document.getElementById("anioSeleccionado").value);
        cerrarModal();

        generarExtractoFiltrado(
            fecha => fecha.getFullYear() === anio,
            `Extracto Anual ${anio}`
        );
    });
}

function mostrarModal(titulo, contenido) {
    cerrarModal();

    const modal = document.createElement("div");
    modal.id = "modalExtracto";

    const box = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = titulo;

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Cancelar";
    closeBtn.addEventListener("click", cerrarModal);

    box.appendChild(title);
    box.appendChild(contenido);
    box.appendChild(closeBtn);
    modal.appendChild(box);
    document.body.appendChild(modal);
}



function generarExtractoCompleto() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    const transacciones = Object.values(usuario.transacciones || {});

    if (transacciones.length === 0) {
        alert("No hay transacciones registradas.");
        return;
    }

    let tablaHTML = `
        <table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;text-align:left;">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Origen</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
    `;

    transacciones.forEach(tx => {
        const fecha = new Date(tx.fecha).toLocaleDateString('es-CO');
        const valor = `$${Math.abs(tx.valor).toLocaleString('es-CO')}`;
        const clase = tx.valor < 0 ? 'color:red' : 'color:green';

        tablaHTML += `
            <tr>
                <td>${fecha}</td>
                <td>${tx.descripcion}</td>
                <td>${tx.origen || "Sistema"}</td>
                <td style="${clase}">${tx.valor < 0 ? '-' : '+'}${valor}</td>
            </tr>
        `;
    });

    tablaHTML += "</tbody></table>";

    const contenedor = crearDivDesdeHTML(tablaHTML);

    // Crear botón imprimir solo si hay datos
    const btnImprimir = document.createElement("button");
    btnImprimir.textContent = "Imprimir";
    btnImprimir.addEventListener("click", () => imprimirContenido("Extracto Completo", contenedor.innerHTML));
    contenedor.appendChild(btnImprimir);

    mostrarModal("Extracto Completo", contenedor);
}



function crearDivDesdeHTML(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    div.style.maxHeight = "400px";
    div.style.overflowY = "auto";
    return div;
}

function cerrarModal() {
    const modalExistente = document.getElementById("modalExtracto");
    if (modalExistente) {
        modalExistente.remove();
    }
}

function logout() {
    localStorage.removeItem('usuarioActivo');
    window.location.href = "../html/inicio-sesion.html";
}

function generarExtractoFiltrado(filtroCallback, titulo) {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    const transacciones = Array.isArray(usuario.transacciones)
        ? usuario.transacciones
        : Object.values(usuario.transacciones || {});

    const filtradas = transacciones.filter(tx => {
        const fecha = new Date(tx.fecha);
        return filtroCallback(fecha);
    });

    if (filtradas.length === 0) {
        alert("No hay transacciones para el período seleccionado.");
        return;
    }

    let html = `
        <table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;text-align:left;">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Origen</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
    `;

    filtradas.forEach(tx => {
        const fecha = new Date(tx.fecha).toLocaleDateString('es-CO');
        const valor = `$${Math.abs(tx.valor).toLocaleString('es-CO')}`;
        const clase = tx.valor < 0 ? 'color:red' : 'color:green';

        html += `
            <tr>
                <td>${fecha}</td>
                <td>${tx.descripcion}</td>
                <td>${tx.origen || "Sistema"}</td>
                <td style="${clase}">${tx.valor < 0 ? '-' : '+'}${valor}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;

    const contenedor = crearDivDesdeHTML(html);

    const btnImprimir = document.createElement("button");
    btnImprimir.textContent = "Imprimir";
    btnImprimir.addEventListener("click", () => imprimirContenido(titulo, contenedor.innerHTML));
    contenedor.appendChild(btnImprimir);

    mostrarModal(titulo, contenedor);
}


function imprimirContenido(titulo, htmlContenido) {
    const ventana = window.open("", "_blank", "width=800,height=600");
    ventana.document.write(`
        <html>
        <head>
            <title>${titulo}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                td[style*="color:red"] { color: red; }
                td[style*="color:green"] { color: green; }
            </style>
        </head>
        <body>
            <h2>${titulo}</h2>
            ${htmlContenido}
            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function () {
                        window.close();
                    };
                };
            </script>
        </body>
        </html>
    `);
    ventana.document.close();
}

