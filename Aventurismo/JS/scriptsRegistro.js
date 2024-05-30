const datos= {
    usuario:'',
    contraseña:'',
    email:''
}

//submit
const formulario=document.querySelector('.formulario2')
formulario.addEventListener('submit', function(e){
    e.preventDefault();

    console.log(e);

    console.log('Di click y la página ya no recarga');

    console.log(datos);
    //Validar formulario
    const {usuario, contraseña, email}=datos;
    if(usuario === '' || contraseña === '' ||email==='') {
        console.log('Al menos un campo esta vacio');
        mostrarError('Todos los campos son obligatorios');
        return; // Detiene la ejecución de esta función
    }

    console.log('Todo bien...')

    mostrarMensaje('Usuario Creado Correctamente');

})

//Mensaje de error
function mostrarError(mensaje) {
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    alerta.classList.add('error');

    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}
//Mensaje correcto
function mostrarMensaje(mensaje) {
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    alerta.classList.add('correcto');
    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

// Eventos de los Inputs...
const usuario = document.querySelector('#usuario');
const contraseña = document.querySelector('#contraseña');
const email = document.querySelector('#email');



usuario.addEventListener('input', leerTexto);
contraseña.addEventListener('input', leerTexto);
email.addEventListener('input', leerTexto);

function leerTexto(e) {
    // console.log(e);
    // console.log(e.target.value);

    datos[e.target.id] = e.target.value;

    console.log(datos);
}
