
const menuPrincipal = document.querySelector("#menuPrincipal .navbar-nav");

export function actualizarNavegacion() { // Comprobamos que exista el menú. if (!menuPrincipal) { return; }

// Eliminamos los elementos dinámicos anteriores.
const elementoAnterior = document.getElementById("usuarioConectadoMenu");
if (elementoAnterior) {
    elementoAnterior.remove();
}

const elementoCerrarSesionAnterior = document.getElementById("cerrarSesionMenu");
if (elementoCerrarSesionAnterior) {
    elementoCerrarSesionAnterior.remove();
}

const elementoLoginAnterior = document.getElementById("iniciarSesionMenu");
if (elementoLoginAnterior) {
    elementoLoginAnterior.remove();
}

// Recuperamos los datos de la sesión.
const datosUsuario = sessionStorage.getItem("usuarioConectado");

if (datosUsuario) {
    try {
        const usuario = JSON.parse(datosUsuario);

        // Mostramos el correo del usuario conectado.
        const elementoUsuario = document.createElement("li");
        elementoUsuario.id = "usuarioConectadoMenu";
        elementoUsuario.className = "nav-item";

        const correoUsuario = document.createElement("span");
        correoUsuario.className = "nav-link text-white";
        correoUsuario.textContent = usuario.email;

        elementoUsuario.appendChild(correoUsuario);
        menuPrincipal.appendChild(elementoUsuario);

        // Añadimos la opción de cerrar sesión.
        const elementoCerrarSesion = document.createElement("li");
        elementoCerrarSesion.id = "cerrarSesionMenu";
        elementoCerrarSesion.className = "nav-item";

        const botonCerrarSesion = document.createElement("button");
        botonCerrarSesion.type = "button";
        botonCerrarSesion.className = "nav-link btn btn-link text-white";
        botonCerrarSesion.textContent = "Cerrar sesión";

        botonCerrarSesion.addEventListener("click", function () {
            sessionStorage.removeItem("usuarioConectado");
            actualizarNavegacion();

            // Si estamos en el login, limpiamos el mensaje anterior.
            if (window.location.pathname.endsWith("/login.html")) {
                window.location.reload();
            }
        });

        elementoCerrarSesion.appendChild(botonCerrarSesion);
        menuPrincipal.appendChild(elementoCerrarSesion);

    } catch (error) {
        // Si la sesión no contiene JSON válido, la eliminamos.
        sessionStorage.removeItem("usuarioConectado");
        mostrarEnlaceLogin();
    }
} else {
    mostrarEnlaceLogin();
}


}

function mostrarEnlaceLogin() { const elementoLogin = document.createElement("li"); elementoLogin.id = "iniciarSesionMenu"; elementoLogin.className = "nav-item";

const enlaceLogin = document.createElement("a");
enlaceLogin.className = "nav-link";
enlaceLogin.href = "login.html";
enlaceLogin.textContent = "Iniciar sesión";

elementoLogin.appendChild(enlaceLogin);
menuPrincipal.appendChild(elementoLogin);


}

// Comprobamos la sesión al cargar la página. 
actualizarNavegacion();

// Escuchamos cambios de almacenamiento procedentes de otras pestañas. 
window.addEventListener("storage", actualizarNavegacion);