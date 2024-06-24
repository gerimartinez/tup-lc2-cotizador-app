document.addEventListener('DOMContentLoaded', function() {
    let informes = localStorage.getItem('informes');
    let informes =JSON.parse(datosEnString);

    if(informes && informes.lenght > 0){
        actualizarTabla('Todas');
        actualizarGrafica('Todas');
    } else{
        console.log('No hay datos de informes guardados');
    }
});
