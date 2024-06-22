document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if(validarForm()) {
            const btn = document.getElementById('button');
            btn.value = 'Enviando...';

            const serviceID = 'service_a1cnk27';
            const templateID = 'template_h83k6a8';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Enviar';
                    mensajeEnviado();
                }, (err) => {
                    btn.value = 'Enviar';
                    errorAlEnviar(err);
                });
        }
    });


    function validarForm() {
        const nombreInput = document.getElementById('nombre')
        const emailInput = document.getElementById('email')
        const mensajeInput = document.getElementById('mensaje')

        const nombreError = document.getElementById('nombre-error')
        const emailError = document.getElementById('email-error')
        const mensajeError = document.getElementById('mensaje-error')

        let esValido = true;

        if(nombreInput.value === '') {
            nombreError.textContent = 'El nombre es requerido.'
            esValido = false;
        } else {
            nombreError.textContent = '';
        }

        if(emailInput.value === '' || !emailInput.value.includes('@')) {
            emailError.textContent = 'El email ingresado es invalido. Debe contener @.'
            esValido = false;
        } else {
            emailError.textContent = '';
        }

        if(mensajeInput.value === '') {
            mensajeError.textContent = 'El mensaje es requerido'
            esValido = false
        } else {
            mensajeError.textContent = ''
        }

        return esValido;
    }

    function mensajeEnviado() {
        Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado correctamente!',
            text: 'Gracias por ponerte en contacto con nosotros.',
            showConfirmButton: false,
            timer: 3000
        });
    }

    function errorAlEnviar(err) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error. Intente de nuevo más tarde.",
            footer: JSON.stringify(err)
          });
    }
});