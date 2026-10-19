// Archivo js/navegacion.js 

export function actualizarNavegacion() {
    // 1. COMPROBAR SESIÓN ACTIVA:
    // Buscamos en el almacenamiento local de la sesión (sessionStorage) si existe una clave llamada "usuarioConectado"
    const datosSesion = sessionStorage.getItem("usuarioConectado");
    
    // 2. CAPTURAR CONTENEDOR DEL MENÚ:
    // Seleccionamos el elemento del menú HTML con id="infoUsuarioNav" donde se reflejará el estado
    const contenedorNav = document.getElementById("infoUsuarioNav");

    // Si el contenedor no existe en la página actual, salimos de la función para evitar errores de JavaScript
    if (!contenedorNav) {
        return; 
    }

    // 3. EVALUAR EL ESTADO DE LA SESIÓN
    if (datosSesion) {
        try {
            // Intentamos convertir el texto plano recuperado de la sesión en un objeto utilizable con JSON.parse()
            const usuario = JSON.parse(datosSesion);
            
            // Si hay éxito, inyectamos dinámicamente el nombre del usuario conectado en la barra de navegación
            contenedorNav.innerHTML = `
                <span class="nav-link text-white fw-semibold">👤 ${usuario.nombre}</span>
            `;
        } catch (error) {
            // Si ocurre algún error al parsear los datos (datos corruptos), eliminamos la sesión por seguridad
            sessionStorage.removeItem("usuarioConectado");
        }
    } else {
        // Si no hay ninguna sesión activa, dejamos el contenedor del menú completamente vacío
        contenedorNav.innerHTML = ``;
    }
}

// 4. EJECUCIÓN AUTOMÁTICA
// Llamamos a la función de forma inmediata nada más cargarse el script en cualquier página
actualizarNavegacion();