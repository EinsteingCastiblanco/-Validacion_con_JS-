//variables
const botonEnviar = document.querySelector('#enviar');
const btnBorrar = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


const error = document.querySelector('#enviar-mail');
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



//eventlistenert
eventlistenert();
function eventlistenert(){
    //cuando inicia la app
    window.addEventListener('DOMContentLoaded', iniciando);

    //campos del formulario
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);
    btnBorrar.addEventListener('click', resetear);
    formulario.addEventListener('submit', enviarEmail);
    
}

//funciones
function iniciando() {
    console.log('iniciando');
    //se desabilitar el boton de enviar
    botonEnviar.disabled = true;
    botonEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {

    //validar que no este vacio el campo
    if (e.target.value.length > 0) {
        //eliminar elemneto de error del DOM
        const erro = document.querySelector('p.error');
        if(erro){
            erro.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
                
        if(expresionRegular.test( e.target.value )){
            const erro = document.querySelector('p.error');
            if(erro){
                erro.remove();
            }
                e.target.classList.remove('border', 'border-red-500');
                e.target.classList.add('border', 'border-green-500');
                
            
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('email no valido');
        }
    }

    if (expresionRegular.test( email.value ) != "" && asunto.value != "" && mensaje.value != "") {
        botonEnviar.disabled = false;
        botonEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } 
}

function mostrarError(errorMensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = errorMensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'p-3', 'mt-5',
    'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length == 0) {
        error.appendChild(mensajeError);
    }
    
}

function enviarEmail(e) {
    e.preventDefault();

    //cargar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    
    //esta funcion se ejecuta en el tiempo que le definamos solo una vez a diferencia de setInterval que se 
    //ejecuta varias veces
    setTimeout( () => {
        spinner.style.display = 'none';
        const msj = document.createElement('p');
        msj.textContent = 'Mensaje enviado correctamente.';

        msj.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white');
        formulario.insertBefore(msj, spinner); //insertar el mensaje antes del spinner
        
        setTimeout(() => {
            msj.remove();
            resetear(e);
        }, 5000);
        
    }, 3000);

    /* setInterval(() => {
        
    }, 3000); */
}

function resetear(e) {
    e.preventDefault();
    formulario.reset();

    iniciando();
}