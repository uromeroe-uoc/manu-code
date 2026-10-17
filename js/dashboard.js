import { usuarios, intercambios } from "./datos.js";

// Buscamos el contenedor donde aparecerán las tarjetas.
const contenedor = document.getElementById("contenedorIntercambios");

// Buscamos el selector de tipo de intercambio.
const filtroTipo = document.getElementById("filtroTipo");

// Función para mostrar todos los intercambios.
function mostrarIntercambios() {
    // Limpiamos el contenedor antes de mostrar los datos.
    contenedor.innerHTML = "";

    // Filtramos los intercambios según la opción seleccionada.
    intercambios
        .filter(function (intercambio) {
            return filtroTipo.value === "todos" ||
                   intercambio.tipo === filtroTipo.value;
        })
        .forEach(function (intercambio) {

        // Buscamos al usuario que ha publicado el intercambio.
        const usuario = usuarios.find(function (u) {
            return u.id === intercambio.usuarioId;
        });

        // Comprobamos si es una oferta o una petición.
        const esOferta = intercambio.tipo === "oferta";
        const color = esOferta ? "success" : "warning";
        const tipoTexto = esOferta ? "Oferta" : "Petición";

        // Creamos el elemento que contendrá la tarjeta.
        const tarjeta = document.createElement("div");
        tarjeta.className = "col-12 col-md-6 col-lg-4";

        // Creamos el contenido de la tarjeta.
        tarjeta.innerHTML = `
            <article class="card h-100 border-${color} shadow-sm">
                <div class="card-body">
                    <span class="badge text-bg-${color} mb-3">
                        ${tipoTexto}
                    </span>

                    <h3 class="card-title h5">
                        ${intercambio.idiomaOfrecido} por
                        ${intercambio.idiomaBuscado}
                    </h3>

                    <p class="card-text">
                        ${intercambio.descripcion}
                    </p>

                    <p class="small mb-2">
                        <strong>Modalidad:</strong>
                        ${intercambio.modalidad}
                    </p>

                    <p class="small mb-0">
                        <strong>Usuario:</strong>
                        ${usuario ? usuario.nombre : "Usuario desconocido"}
                    </p>
                </div>
            </article>
        `;

        // Añadimos la tarjeta al contenedor del dashboard.
        contenedor.appendChild(tarjeta);
    });
}

// Mostramos los intercambios al cargar la página.
mostrarIntercambios();

// Actualizamos las tarjetas cuando cambia el filtro.
filtroTipo.addEventListener("change", mostrarIntercambios);