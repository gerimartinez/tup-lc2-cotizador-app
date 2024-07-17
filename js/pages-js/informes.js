document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos guardados en localStorage
    let informe = localStorage.getItem('informes');
    let datosInformes = JSON.parse(informe);
    console.log(datosInformes);

    if (informe && datosInformes.length > 0) {
        actualizarGrafica(datosInformes);
    } else {
        console.log('No hay datos de informes guardados');
    }
});

function actualizarGrafica(datosInformes) {
    const etiquetas = datosInformes.map(informe => informe.date.split(',')[0]);
    /*const etiquetas = datosInformes.map(informe => {
        const dateTime = informe.date.split(' '); // split the date and time into two parts
        const date = dateTime[0]; // extract the date part
        const time = dateTime[1]; // extract the time part
        return `${date} ${time}`; // combine the date and time into a single string
      });*/

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

    const datasetsVenta = datosInformes.map(informe => {
        return {
            label: informe.name,
            data: [informe.data.venta, informe.data.venta - 100, informe.data.venta + 500],
            borderColor: colores[informe.name] || 'black',
            backgroundColor: 'transparent',
            borderWidth: 1,
            fill: false
        };
    });

    const datasetsCompra = datosInformes.map(informe => {
        return {
            label: informe.name,
            data: [informe.data.compra, informe.data.compra - 100, informe.data.compra + 500],
            borderColor: colores[informe.name] || 'black',
            backgroundColor: 'transparent',
            borderWidth: 1,
            fill: false
        };
    });

    const datasetsCombinados = datasetsVenta.concat(datasetsCompra);

        const ctxCombinado = document.getElementById("miGraficaCombinada").getContext("2d");
        new Chart(ctxCombinado, {
            type: "line",
            data: {
                labels: etiquetas,
                datasets: datasetsCombinados
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
}