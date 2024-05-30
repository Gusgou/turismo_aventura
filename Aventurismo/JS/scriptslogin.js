// const usuario = document.getElementById('usuario')
// const contraseña = document.getElementById('contraseña')
// const form = document.getElementById('form')
// const parrafo = document.getElementById('warnings')

const datos= {
    usuario:'',
    contraseña:''
}

//submit
const formulario=document.querySelector('.formulario1')
formulario.addEventListener('submit', function(e){
    e.preventDefault();

    console.log(e);

    console.log('Di click y la página ya no recarga');

    console.log(datos);
    //Validar formulario
    const {usuario, contraseña}=datos;
    if(usuario === '' || contraseña === '' ) {
        console.log('Al menos un campo esta vacio');
        mostrarError('Todos los campos son obligatorios');
        return; // Detiene la ejecución de esta función
    }

    console.log('Todo bien...')

    mostrarMensaje('Ingreso correctamente');

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



usuario.addEventListener('input', leerTexto);
contraseña.addEventListener('input', leerTexto);


function leerTexto(e) {
    // console.log(e);
    // console.log(e.target.value);

    datos[e.target.id] = e.target.value;

    console.log(datos);
}

//Registro

// form.addEventListener("submit", e=>{
//     e.preventDefault()
//     if (usuario.value.length <6){
//         alert("Usuario muy corto. Min 6 caracteres")
//     }
// })
  