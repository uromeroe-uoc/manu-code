
// 1. IMPORTACIONES DE MÓDULOS
import { usuarios, intercambios } from "./datos.js";
import { actualizarNavegacion } from "./navegacion.js";

// 2. CAPTURAR ELEMENTOS DEL DOM
const saludoDashboard = document.getElementById("saludoDashboard");
const contenedorEstadisticas = document.getElementById("contenedorEstadisticas");

// 3. FUNCIÓN DE PROTECCIÓN Y CARGA DEL PANEL
function inicializarDashboard() {
    // Comprobamos si existe la sesión activa en el almacenamiento del navegador
    const datosSesion = sessionStorage.getItem("usuarioConectado");

    if (!datosSesion) {
        // Si no hay sesión activa, redirigimos automáticamente al usuario a la página de login por seguridad
        window.location.href = "login.html";
        return;
    }

    try {
        // Convertimos los datos de texto plano a un objeto utilizable
        const usuarioConectado = JSON.parse(datosSesion);

        // Si existe el elemento de saludo, personalizamos el mensaje con su nombre
        if (saludoDashboard) {
            saludoDashboard.textContent = `¡Hola, ${usuarioConectado.nombre}! 👋`;
        }

        // Filtramos los intercambios creados por este usuario específico
        const misIntercambios = intercambios.filter(function (intercambio) {
            return intercambio.usuarioId === usuarioConectado.id;
        });

        // Mostramos un resumen de su actividad en el panel
        if (contenedorEstadisticas) {
            contenedorEstadisticas.innerHTML = `
                <div class="card shadow-sm border-0 p-4">
                    <h5 class="fw-bold text-primary mb-3">📊 Resumen de tu cuenta</h5>
                    <p class="mb-2"><strong>Correo electrónico:</strong> ${usuarioConectado.email}</p>
                    <p class="mb-3"><strong>Anuncios publicados:</strong> ${misIntercambios.length} intercambio(s)</p>
                    <a href="intercambios.html" class="btn btn-outline-primary btn-sm">Ver tablón general</a>
                </div>
            `;
        }

    } catch (error) {
        // Si hay algún fallo al leer los datos de la sesión, limpiamos y redirigimos al login
        sessionStorage.removeItem("usuarioConectado");
        window.location.href = "login.html";
    }
}

// 4. INICIALIZACIÓN
inicializarDashboard();