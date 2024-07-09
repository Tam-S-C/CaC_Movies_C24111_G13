document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.formulario');
    const mensajeNoValido = document.createElement('p');
    mensajeNoValido.classList.add('mensaje-no-valido');
    formulario.appendChild(mensajeNoValido);

    const mostrarError = (input, mensaje) => {
        const divPadre = input.parentElement;
        const errorText = divPadre.querySelector('.error-text');
        divPadre.classList.add('error');
        errorText.innerText = mensaje;
    };

    const eliminarError = input => {
        const divPadre = input.parentElement;
        divPadre.classList.remove('error');
        const errorText = divPadre.querySelector('.error-text');
        errorText.innerText = '';
    };

    formulario.querySelectorAll('.barraRegistro').forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                mostrarError(input, 'Este campo es obligatorio');
            } else {
                eliminarError(input);
            }
        });
    });

    const validarTerminos = () => {
        const checkboxTerminos = document.getElementById('terminos');
        if (!checkboxTerminos.checked) {
            mostrarError(checkboxTerminos, 'Debes aceptar los términos y condiciones');
            return false;
        } else {
            eliminarError(checkboxTerminos);
            return true;
        }
    };

    const validarContrasenas = () => {
        // Añade la validación de contraseñas aquí, si tienes alguna lógica específica.
        return true;
    };

    formulario.addEventListener('submit', event => {
        event.preventDefault();
    
        let formValido = true;
    
        formulario.querySelectorAll('.barraRegistro').forEach(input => {
            if (input.value.trim() === '') {
                mostrarError(input, 'Este campo es obligatorio');
                formValido = false;
            } else {
                eliminarError(input);
            }
        });
    
        if (!validarTerminos() || !validarContrasenas()) {
            formValido = false;
        }
    
        if (formValido) {
            mensajeNoValido.innerText = '';
            Toastify({
                text: "Registro válido",
                duration: 2000,
                offset: {
                    y: 40
                },
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #28a745, #218838)",
                },
            }).showToast();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2500); // Redirige después de 2 segundos y medio
        } else {
            mensajeNoValido.innerText = 'El formulario no es válido';
            mensajeNoValido.classList.add('error-text');
            Toastify({
                text: "Registro inválido",
                duration: 2000,
                offset: {
                    y: 40
                },
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #dc3545, #c82333)",
                },
            }).showToast();
        }
    });
});
