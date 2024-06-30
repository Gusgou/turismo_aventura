document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const formulario = document.getElementById('form');
    const usuarioInput = document.getElementById('usuario');
    const contraseñaInput = document.getElementById('contraseña');

    // Objeto para almacenar datos del formulario
    const datos = {
        usuario: '',
        contraseña: ''
    };

    // Agregar evento 'submit' al formulario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        console.log(e);
        console.log('Di click y la página ya no recarga');
        console.log(datos);

        // Validar formulario
        const { usuario, contraseña } = datos;
        if (usuario === '' || contraseña === '') {
            console.log('Al menos un campo está vacío');
            mostrarError('Todos los campos son obligatorios');
            return; // Detiene la ejecución de esta función
        }

        console.log('Todo bien...');
        mostrarMensaje('Ingreso correctamente');

        // Redirigir a otra página después de la validación exitosa
        setTimeout(() => {
            window.location.href = 'inicio_usuario';
        }, 3000); // Esperar 3 segundos antes de redirigir
    });

    // Función para mostrar mensaje de error
    function mostrarError(mensaje) {
        const alerta = document.createElement('p');
        alerta.textContent = mensaje;
        alerta.classList.add('error');
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

    // Función para mostrar mensaje correcto
    function mostrarMensaje(mensaje) {
        const alerta = document.createElement('p');
        alerta.textContent = mensaje;
        alerta.classList.add('correcto');
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

    // Eventos de los inputs
    usuarioInput.addEventListener('input', leerTexto);
    contraseñaInput.addEventListener('input', leerTexto);

    function leerTexto(e) {
        datos[e.target.id] = e.target.value;
        console.log(datos);
    }
});
