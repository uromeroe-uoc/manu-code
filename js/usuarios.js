
// ==========================================
// 1. IMPORTACIONES DE MÓDULOS
// ==========================================
// Traemos el array de usuarios desde 'datos.js' y la función de navegación desde 'navegacion.js'
import { usuarios } from "./datos.js";
import { actualizarNavegacion } from "./navegacion.js";



// Guardamos en constantes los elementos con los que va a interactuar nuestro script
const formulario = document.getElementById("formularioUsuario");
const campoNombre = document.getElementById("nombre");
const campoEmail = document.getElementById("emailUsuario");
const campoPassword = document.getElementById("passwordUsuario");
const mensaje = document.getElementById("mensajeUsuario");
const listaUsuarios = document.getElementById("listaUsuarios");
const mensajeListaVacia = document.getElementById("mensajeListaVacia");



// 3. FUNCIÓN PARA MOSTRAR LOS USUARIOS EN LA TABLA

function mostrarUsuarios() {
    // Vaciamos la tabla por completo antes de redibujar para evitar que se dupliquen filas
    listaUsuarios.innerHTML = "";

    // Recorremos el array 'usuarios' uno por uno usando forEach
    usuarios.forEach(function (usuario) {
        // Creamos dinámicamente una etiqueta <tr> (fila de tabla) por cada usuario
        const fila = document.createElement("tr");

        // Estructura HTML interna de la fila con clases de Bootstrap y un botón con su data-id único
        fila.innerHTML = `
            <td class="py-3 px-4">${usuario.id}</td>
            <td class="py-3"></td>
            <td class="py-3"></td>
            <td class="py-3">
                <button
                    type="button"
                    class="btn btn-danger btn-sm border-0 shadow-sm"
                    data-id="${usuario.id}"
                >
                    Eliminar
                </button>
            </td>
        `;

        // INSERCIÓN SEGURA DE TEXTO:
        // Asignamos los textos usando textContent en lugar de interpolar HTML directamente,
        // previniendo ataques de inyección (XSS) y protegiendo la aplicación.
        fila.children[1].textContent = usuario.nombre;
        fila.children[2].textContent = usuario.email;

        // Añadimos la fila ya completa dentro del cuerpo de la tabla (tbody)
        listaUsuarios.appendChild(fila);
    });

    // Control de lista vacía: si el array no tiene elementos, mostramos un aviso visual
    mensajeListaVacia.textContent = usuarios.length === 0
        ? "Todavía no hay usuarios registrados."
        : "";
}



// 4. FUNCIÓN PARA MOSTRAR MENSAJES Y ALERTAS

// Modifica el texto y asigna clases de alerta de Bootstrap dinámicamente ("success" o "danger")
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `alert alert-${tipo} mt-3`;
}



// 5. REGISTRAR UN NUEVO USUARIO (EVENTO SUBMIT)

formulario.addEventListener("submit", function (evento) {
    // Evitamos el comportamiento por defecto del formulario (que recargarías la página al enviar)
    evento.preventDefault();

    // Capturamos los valores escritos por el usuario aplicando .trim() para eliminar espacios vacíos sobrantes
    const nombre = campoNombre.value.trim();
    const email = campoEmail.value.trim();
    const password = campoPassword.value;

    // VALIDACIÓN DE CORREO DUPLICADO:
    // El método .some() comprueba si al menos un usuario del array ya tiene ese mismo correo (ignorando mayúsculas/minúsculas)
    const correoExiste = usuarios.some(function (usuario) {
        return usuario.email.toLowerCase() === email.toLowerCase();
    });

    // Si el correo ya existe, mostramos alerta roja y frenamos la ejecución con 'return'
    if (correoExiste) {
        mostrarMensaje("Ya existe un usuario con ese correo electrónico.", "danger");
        return;
    }

    // GENERACIÓN AUTOMÁTICA DE ID ÚNICO:
    // Si hay usuarios, busca el ID más alto con Math.max y le suma 1. Si está vacío, le asigna el 1.
    const nuevoId = usuarios.length > 0
        ? Math.max(...usuarios.map(function (usuario) {
            return usuario.id;
        })) + 1
        : 1;

    // Añadimos el nuevo objeto usuario al array principal
    usuarios.push({
        id: nuevoId,
        nombre: nombre,
        email: email,
        password: password
    });

    // Actualizamos la tabla visualmente, limpiamos los campos del formulario y lanzamos aviso de éxito
    mostrarUsuarios();
    formulario.reset();
    mostrarMensaje("Usuario registrado correctamente.", "success");
});



// 6. ELIMINAR USUARIO (DELEGACIÓN DE EVENTOS)

// Escuchamos los clics en toda la tabla, optimizando el rendimiento sin necesidad de poner un evento a cada botón
listaUsuarios.addEventListener("click", function (evento) {
    // Buscamos si el elemento clicado (o su contenedor cercano) es un botón con el atributo 'data-id'
    const boton = evento.target.closest("button[data-id]");

    // Si se hizo clic fuera de un botón de eliminar, no hacemos nada
    if (!boton) {
        return;
    }

    // Extraemos el ID numérico del botón utilizando el dataset
    const id = Number(boton.dataset.id);

    // Buscamos el índice (posición) que ocupa ese usuario dentro del array con findIndex
    const indice = usuarios.findIndex(function (usuario) {
        return usuario.id === id;
    });

    // Si no se encuentra el índice, salimos
    if (indice === -1) {
        return;
    }

    // Ventana emergente de confirmación nativa del navegador antes de borrar
    const confirmar = window.confirm(
        "¿Seguro que quieres eliminar este usuario?"
    );

    if (!confirmar) {
        return;
    }

    // SEGURIDAD DE SESIÓN:
    // Comprobamos si el usuario que vamos a eliminar es el mismo que tiene la sesión activa actualmente
    const datosSesion = sessionStorage.getItem("usuarioConectado");

    if (datosSesion) {
        try {
            const usuarioConectado = JSON.parse(datosSesion);

            // Si coincide el ID del usuario conectado con el que estamos borrando, destruimos su sesión por seguridad
            if (usuarioConectado.id === id) {
                sessionStorage.removeItem("usuarioConectado");
            }
        } catch (error) {
            // Si hay algún fallo al parsear la sesión, la eliminamos para evitar errores
            sessionStorage.removeItem("usuarioConectado");
        }
    }

    // ELIMINACIÓN DEL ARRAY:
    // El método .splice() borra 1 elemento a partir de la posición indicada por 'indice'
    usuarios.splice(indice, 1);

    // Refrescamos la tabla, mostramos mensaje de éxito y actualizamos la barra de navegación superior
    mostrarUsuarios();
    mostrarMensaje("Usuario eliminado correctamente.", "success");
    actualizarNavegacion();
});



// 7. INICIALIZACIÓN DE LA VISTA

// Llamamos a la función al cargar el script para que pinte los datos iniciales al abrir la página
mostrarUsuarios();