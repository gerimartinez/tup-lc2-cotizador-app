document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos guardados en localStorage
    let informe = localStorage.getItem('informes');
    let datosInformes = JSON.parse(informe);
    console.log(datosInformes)

    if (informe && datosInformes.length > 0) {
        actualizarGrafica(datosInformes);
    } else {
        console.log('No hay datos de informes guardados');
    }
});

function actualizarGrafica(datosInformes) {
    const etiquetas = datosInformes.map(informe => informe.date.split(',')[0]);

    const colores = {
        'Dolar Blue': 'blue',
        'Dolar Mayorista': 'green',
        'Dolar Oficial': 'yellow',
        'Dolar Bolsa': 'red',
        'Dolar CCL': 'orange',
        'Dolar Tarjeta': 'pink',
        'Dolar Cripto': 'purple',
        'Euro': 'light-blue',
        'Real Brasileño': 'coral',
        'Peso Chileno': 'greenyellow',
        'Peso Uruguayo': 'peru',
        // Añade más colores según sea necesario
    };

    const datasets = datosInformes.map(informe => {
        return {
            label: informe.name,
            data:  [informe.data.compra, informe.data.compra - 100, informe.data.compra + 500],
            borderColor: colores[informe.name] || 'black',
            backgroundColor: 'transparent',
            borderWidth: 1,
            fill: false
        };
    });

    const ctx = document.getElementById("miGrafica1").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: etiquetas,
            datasets: datasets
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