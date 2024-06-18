document.addEventListener("DOMContentLoaded", () => {

    const actualizacion = () => {
        
        fetch('https://dolarapi.com/v1/dolares')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const lista = document.getElementById('dolar-lista');
                const fechaA = document.getElementById('fecha-actualizacion')

                const fechaActualizacion = new Date(data[0].fechaActualizacion);

                const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
                const fechaFormateada = fechaActualizacion.toLocaleString('es-ES', options).replace(',', '');

                fechaA.textContent = `Datos actualizados al ${fechaFormateada}hs`;

                data.forEach(item => {
                    const cotizacion = document.createElement('div');
                    cotizacion.classList.add('cotizacion');

                    cotizacion.innerHTML = `
                        <div>
                            <p>${item.nombre.toUpperCase()}</p>
                        </div>
                        <div class="contenedor-precio">
                            <div class="cont-title">
                                <p>Compra</p>
                                <p>Venta</p>
                            </div>
                            <div class="cont-precio">
                                <p>$${item.compra}</p>
                                <p>$${item.venta}</p>
                            </div>
                        </div>
                        <div class="contenedor-boton">
                            <button data-nombre='${item.nombre}'>
                                <i class="fa-solid fa-star"></i>
                            </button>
                        </div>
                    `;
        
                    lista.appendChild(cotizacion);
                });

                document.querySelectorAll('.contenedor-boton button').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const nombre = event.currentTarget.getAttribute('data-nombre');
                        agregarAFavoritos(nombre);
                    });
                });

                setTimeout(actualizacion, 300000);
            })
            .catch(error => {
                console.log(error);
            });
    }
    actualizacion()
})

function agregarAFavoritos(nombre) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (!favoritos.includes(nombre)) {
        favoritos.push(nombre);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        console.log(favoritos)
        alert(`Añadido a favoritos: ${nombre}`);
        console.log(favoritos)
    } else {
        alert(`${nombre} ya está en favoritos.`);
    }
}