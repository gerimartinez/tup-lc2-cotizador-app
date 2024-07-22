const tarjetas = [
    { src: '/img/BradPitt.jpg', nombre: 'Brad Pitt', descripcion: 'El cotizador de monedas me ha facilitado mucho la vida. Antes solía perder tiempo comparando precios en diferentes sitios, pero ahora con esta herramienta tengo toda la información al instante. ¡Muy recomendado!' },
    { src: '/img/SuperMan.jpg', nombre: 'SuperMan', descripcion: 'Como defensor de la justicia, tener acceso a un cotizador de monedas preciso y rápido es vital para mí. Es esencial cuando necesito intercambiar kryptonianos por dólares o euros. ¡Altamente recomendado para héroes y ciudadanos por igual!' },
    { src: '/img/ZacEfron.jpeg', nombre: 'Zac Efron', descripcion: 'Como viajero frecuente, siempre necesito saber el tipo de cambio actual. Este cotizador es mi herramienta favorita porque es rápida y confiable. La uso todo el tiempo y nunca me ha decepcionado.' },
];

let indiceActual = 0;

function cambiarContenidoTarjeta() {
    indiceActual = (indiceActual + 1) % tarjetas.length;
    document.getElementById('imagen-principal').src = tarjetas[indiceActual].src;
    document.getElementById('nombre').innerText = tarjetas[indiceActual].nombre;
    document.getElementById('descripcion').innerText = tarjetas[indiceActual].descripcion;
}

setInterval(cambiarContenidoTarjeta, 10000);