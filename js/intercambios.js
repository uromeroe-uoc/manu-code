// 1. IMPORTACIONES DE MÓDULOS
// Importamos el array de intercambios desde 'datos.js' y la función de navegación
import { intercambios } from "./datos.js";
import { actualizarNavegacion } from "./navegacion.js";


// 2. CAPTURAR ELEMENTOS DEL HTML (DOM)
const contenedorIntercambios = document.getElementById("contenedorIntercambios");
const mensajeIntercambiosVacio = document.getElementById("mensajeIntercambiosVacio");


// 3. FUNCIÓN PARA MOSTRAR LOS INTERCAMBIOS EN TARJETAS (CARDS)
function mostrarIntercambios() {
    // Vaciamos el contenedor por completo antes de redibujar
    contenedorIntercambios.innerHTML = "";

    // Recorremos el array 'intercambios' usando forEach
    intercambios.forEach(function (intercambio) {
        // Creamos dinámicamente una columna (div) para cada tarjeta de Bootstrap
        const columna = document.createElement("div");
        columna.className = "col-md-4"; // Ocupa 4 columnas en pantallas medianas (3 tarjetas por fila)

        // Definimos si el badge (etiqueta) es de tipo oferta o petición para cambiar su color visual
        const esOferta = intercambio.tipo === "oferta";
        const claseBadge = esOferta ? "bg-success" : "bg-warning text-dark";
        const textoTipo = esOferta ? "Oferta de intercambio" : "Petición de intercambio";

        // Construimos la estructura interna de la tarjeta con clases de Bootstrap
        columna.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body d-flex flex-column">
                    <!-- Cabecera de la tarjeta con el tipo y la fecha -->
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="badge ${claseBadge} px-3 py-2">${textoTipo}</span>
                        <small class="text-muted">${intercambio.fechaCreacion}</small>
                    </div>

                    <!-- Idiomas ofrecidos y buscados -->
                    <h5 class="card-title fw-bold text-dark mb-2">
                        Enseña: <span class="text-primary">${intercambio.idiomaOfrecido}</span>
                    </h5>
                    <h6 class="card-subtitle mb-3 text-secondary">
                        Busca aprender: <span class="fw-semibold">${intercambio.idiomaBuscado}</span>
                    </h6>

                    <!-- Modalidad y descripción -->
                    <p class="card-text texto-subtitulo mb-2">
                        <strong>Modalidad:</strong> ${intercambio.modalidad}
                    </p>
                    <p class="card-text texto-subtitulo mb-4 flex-grow-1">
                        "${intercambio.descripcion}"
                    </p>

                    <!-- Botón de contacto o detalles -->
                    <button type="button" class="btn btn-outline-primary w-100 mt-auto border-0 bg-light text-dark fw-semibold">
                        Contactar compañero
                    </button>
                </div>
            </div>
        `;

        // Añadimos la columna con su tarjeta dentro del contenedor principal de la vista
        contenedorIntercambios.appendChild(columna);
    });

    // Control por si no hay intercambios registrados
    mensajeIntercambiosVacio.textContent = intercambios.length === 0
        ? "No hay intercambios disponibles en este momento."
        : "";
}


// 4. INICIALIZACIÓN DE LA VISTA
mostrarIntercambios();