document.addEventListener('DOMContentLoaded',() => {
const formulario = document.querySelector('form');
// mostrar error
const mostrarError = (input,mensaje)=>{
    const divPrimero = input.parentNode;
    const errorText = divPrimero.querySelector('.error-text');
    divPrimero.classList.add('error');
    errorText.innerText = mensaje;
}

const input = document.querySelector('#email');
const mensaje = 'campo obligatorio';

//.............................................
const eliminarError = input =>{
    const divPrimero = input.parentNode;
    divPrimero.classList.remove('error');
    const errorText = divPrimero.querySelector('.error-text');
    errorText.innerText = '';
}

//...................................
//funcion para validar que se haya ingresado el dato
formulario.querySelectorAll('input').forEach(input=> {
    input.addEventListener('change',()=>{
        const valor =input.value.trim();
        if(valor !== ''){
            eliminarError(input);
        }
    })
});

//...........................................
// validar datos ingresados
function validarCampo(campoId,mensaje){
    const campo = document.getElementById(campoId);
    const value = campo.value.trim();
    if(value == ''){
        mostrarError(campo,mensaje);
        return false;
        }else{
            eliminarError(campo);
            return true;
        }
    }
    //validar email
    function isEmail(email){
        const expresionRegular =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email);
    }

    function validarEmail(campoId,mensaje){
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();
        if (email == ''){
            mostrarError(campo, 'El correo electronico es obligatorio');
            return false;
         }else if(!isEmail(email)){
            mostrarError(campo, mensaje);
            return false;
         }else{
            eliminarError(campo);
            return true;
         }
    }
    //...........................
    //funcion validar el formulario
    const validarFormulario =() =>{
        let validar = true;
        validar = validarEmail('email','El correo electronico no es válido')&& validar;
        validar = validarCampo('password','La contraseña es obligatoria')&& validar;

        return validar;
    }
    //........................
    // Evento de escucha
    formulario.addEventListener('submit', event =>{
        event.preventDefault();
        if(!validarFormulario()){
            event.preventDefault();
            console.log("El formulario no es válido");
        }else{
            event.preventDefault();
            console.log("El formulario es válido.");
        }
    })
})
