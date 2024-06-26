document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos guardados en localStorage
    let informe = localStorage.getItem('informes');
    let datosInformes = JSON.parse(informe);

    if (informe && datosInformes.length > 0) {
        actualizarGrafica(datosInformes);
    } else {
        console.log('No hay datos de informes guardados');
    }
});

function actualizarGrafica(datosInformes) {
    // Ajusta estos nombres de campo según los datos que tengas en localStorage
    const etiquetas = datosInformes.map(informe => informe.fecha);//hacer array-campo fecha // Campo 'fecha' en tus datos
    const datos = datosInformes.map(informe => informe.valor); // Campo 'valor' en tus datos

    const ctx = document.getElementById("miGrafica1").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Cotización del dólar",
                data: datos,
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}