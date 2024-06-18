document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contacto");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = form.querySelector("#nombre").value;
        const email = form.querySelector("#email").value;
        const mensaje = form.querySelector("#mensaje").value;

        if (nombre === '' || email === '' || mensaje === '') {
            alert("Por favor, completa todos los campos del formulario.");
            return;
        }

        const templateParams = {
            nombre: nombre,
            email: email,
            mensaje: mensaje
        };

        emailjs.send('service_yourServiceId', 'template_yourTemplateId', templateParams)
            .then(function (response) {
                console.log('Correo enviado correctamente', response);
                alert("¡Mensaje enviado correctamente!");
                form.reset();
            }, function (error) {
                console.error('Error al enviar el correo', error);
                alert("Ocurrió un error al enviar el mensaje. Por favor, intentelo nuevamente.");
            });
    });
});