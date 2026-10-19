// ==========================================
// 1. IMPORTACIONES DE MÓDULOS
// ==========================================
// Traemos el array de usuarios desde 'datos.js' y la función de navegación desde 'navegacion.js'
import { usuarios } from "./datos.js";
import { actualizarNavegacion } from "./navegacion.js";

// 2. CAPTURAR ELEMENTOS DEL HTML (DOM)
// Guardamos en constantes los elementos del formulario de login y el contenedor de alertas

const formularioLogin = document.getElementById("formularioLogin");
const campoEmailLogin = document.getElementById("emailLogin");
const campoPasswordLogin = document.getElementById("passwordLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

// 3. FUNCIÓN AUXILIAR PARA MOSTRAR MENSAJES Y ALERTAS
// Modifica el texto y asigna dinámicamente las clases de alerta de Bootstrap ("success" o "danger")
function mostrarMensaje(texto, tipo) {
    mensajeLogin.textContent = texto;
    mensajeLogin.className = `alert alert-${tipo} mt-3`;
}

// 4. EVENTO SUBMIT (AL INTENTAR INICIAR SESIÓN)
formularioLogin.addEventListener("submit", function (evento) {
    // Evitamos que la página se recargue por defecto al enviar el formulario
    evento.preventDefault();

    // Capturamos los valores introducidos por el usuario aplicando .trim() al correo para evitar espacios
    const emailIngresado = campoEmailLogin.value.trim();
    const passwordIngresado = campoPasswordLogin.value;

    // BÚSQUEDA DEL USUARIO (MÉTODO .find()):
    // Buscamos en el array 'usuarios' si hay algún objeto cuyo email y contraseña coincidan con los introducidos.
    // Comparamos el email en minúsculas para evitar problemas con mayúsculas accidentales.
    const usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.email.toLowerCase() === emailIngresado.toLowerCase() && 
               usuario.password === passwordIngresado;
    });

// 5. VALIDACIÓN DEL ACCESO
    if (!usuarioEncontrado) {
        // Si no se encuentra ningún usuario que coincida, mostramos una alerta roja de error
        mostrarMensaje("Correo electrónico o contraseña incorrectos.", "danger");
        return; // Detenemos la ejecución
    }

    // SI LAS CREDENCIALES SON CORRECTAS:
    
    // Guardamos los datos del usuario conectado en la memoria temporal del navegador (sessionStorage).
    // Usamos JSON.stringify() porque sessionStorage solo guarda texto plano (strings).
    sessionStorage.setItem("usuarioConectado", JSON.stringify(usuarioEncontrado));

    // Actualizamos la barra de navegación inmediatamente para que refleje el nombre del usuario
    actualizarNavegacion();

    // Mostramos un mensaje visual de éxito en verde
    mostrarMensaje("¡Inicio de sesión exitoso! Redirigiendo...", "success");

    // Limpiamos los campos del formulario
    formularioLogin.reset();

    // Redirigimos al usuario a la página de inicio o de usuarios transcurridos 1.5 segundos (1500 milisegundos)
    setTimeout(function () {
        window.location.href = "usuarios.html"; // Puedes cambiarlo a "index.html" si lo prefieres
    }, 1500);
});