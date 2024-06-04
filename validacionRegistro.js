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
    }

    const eliminarError = input => {
        const divPadre = input.parentElement;
        divPadre.classList.remove('error');
        const errorText = divPadre.querySelector('.error-text');
        errorText.innerText = '';
    }

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
    }

    const validarContraseñas = () => {
        const password = document.getElementById('password').value;
        const confirmarPassword = document.getElementById('confirmarPassword').value;
        if (password !== confirmarPassword) {
            mostrarError(document.getElementById('confirmarPassword'), 'Las contraseñas no coinciden');
            return false;
        } else {
            eliminarError(document.getElementById('confirmarPassword'));
            return true;
        }
    }

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

        if (!validarTerminos() || !validarContraseñas()) {
            formValido = false;
        }

        if (formValido) {
            mensajeNoValido.innerText = '';
            console.log('Formulario válido. Procesar registro...');
            window.location.href = 'index.html';
        } else {
            mensajeNoValido.innerText = 'El formulario no es válido';
            mensajeNoValido.classList.add('error-text');
            console.log('El formulario no es válido');
        }
    });
});
