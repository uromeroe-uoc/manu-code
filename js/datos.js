/* ==========================================================================
   FICHERO DE DATOS COMPARTIDOS (datos.js)
   Este archivo actúa como nuestra "base de datos" temporal en el navegador.
   Al utilizar la palabra clave 'export', permitimos que otras partes de nuestra
   aplicación (como los scripts de usuarios o intercambios) puedan importar 
   y leer esta información.
   ========================================================================== */

// 1. ARRAY DE USUARIOS INICIALES
// Utilizamos un array (representado por corchetes [ ]) que contiene objetos (representados por llaves { }).
// Cada objeto representa a un usuario individual con sus propiedades únicas.
export const usuarios = [ // export const: Permite sacar la variable fuera de este archivo para que otro script pueda usarla mediante import.
    {
        id: 1,                          // Identificador numérico único para distinguir al usuario
        nombre: "Ana García",           // Nombre completo del usuario
        email: "ana.garcia@example.com", // Correo electrónico (utilizado para validar que no se repita)
        password: "ana123"              // Contraseña de acceso a la plataforma
    },
    {
        id: 2,
        nombre: "Carlos López",
        email: "carlos@example.com",
        password: "carlos123"
    },
    {
        id: 3,
        nombre: "Lucía Martín",
        email: "lucia@example.com",
        password: "lucia123"
    }
];

 
// 2. ARRAY DE INTERCAMBIOS INICIALES
// Almacena las ofertas y peticiones de idiomas publicadas en la plataforma.
export const intercambios = [
    {
        id: 1,                          // Identificador único del anuncio de intercambio
        tipo: "oferta",                 // Define si es una "oferta" (ofrecer ayuda) o una "petición" (pedir ayuda)
        usuarioId: 1,                   // Relación clave: indica qué usuario (según su id) ha creado este anuncio
        idiomaOfrecido: "Español",      // Idioma que el usuario domina y está dispuesto a enseñar
        idiomaBuscado: "Inglés",        // Idioma que el usuario desea aprender o practicar
        modalidad: "Presencial",        // Formato del intercambio (ej. Presencial u Online)
        descripcion: "Quiero practicar a hablar en inglés.", // Breve texto explicativo del anuncio
        fechaCreacion: "2026-10-10"     // Fecha en la que se publicó el intercambio (formato YYYY-MM-DD)
    },
    {
        id: 2,
        tipo: "petición",
        usuarioId: 2,
        idiomaOfrecido: "Inglés",
        idiomaBuscado: "Francés",
        modalidad: "Online",
        descripcion: "Busco practicar francés con otra persona.",
        fechaCreacion: "2026-10-14"
    },
    {
        id: 3,
        tipo: "oferta",
        usuarioId: 3,
        idiomaOfrecido: "Francés",
        idiomaBuscado: "Español",
        modalidad: "Online",
        descripcion: "Puedo ayudar con francés a cambio de español.",
        fechaCreacion: "2026-10-17"
    }
];