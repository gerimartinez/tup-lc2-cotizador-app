document.addEventListener('DOMContentLoaded', function() {
    let informe = localStorage.getItem('informes');
    let datosInformes = JSON.parse(informe);
    console.log(datosInformes);

    if (informe && datosInformes.length > 0) {
        const datosAgrupados = agruparDatosPorFecha(datosInformes);
        const monedasDisponibles = obtenerMonedasDisponibles(datosAgrupados);
        actualizarGrafica(datosAgrupados, monedasDisponibles);
        
        document.getElementById('btnActualizar').addEventListener('click', function() {
            const monedaSeleccionada = document.getElementById('moneda').value;
            actualizarGrafica(datosAgrupados, monedasDisponibles, monedaSeleccionada);
        });
    } else {
        console.log('No hay datos de informes guardados');
    }
});

function agruparDatosPorFecha(datosInformes) {
    const datosAgrupados = {};

    datosInformes.forEach(informe => {
        if (!datosAgrupados[informe.date]) {
            datosAgrupados[informe.date] = {};
        }
        datosAgrupados[informe.date][informe.name] = informe.data;
    });

    return datosAgrupados;
}

function obtenerMonedasDisponibles(datosAgrupados) {
    const monedas = new Set();

    Object.values(datosAgrupados).forEach(dia => {
        Object.keys(dia).forEach(moneda => {
            monedas.add(moneda);
        });
    });

    return Array.from(monedas);
}

function actualizarGrafica(datosAgrupados, monedasDisponibles, monedaSeleccionada) {
    const etiquetas = Object.keys(datosAgrupados);

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
    };

    const datasetsVenta = monedasDisponibles
        .filter(moneda => monedaSeleccionada === 'todas' || moneda === monedaSeleccionada)
        .map(moneda => ({
            label: [moneda, ' Venta'],
            data: etiquetas.map(fecha => datosAgrupados[fecha][moneda].venta || 0),
            borderColor: colores[moneda] || 'black',
            backgroundColor: 'transparent',
            borderWidth: 1,
            fill: false
        }));

    const datasetsCompra = monedasDisponibles
        .filter(moneda => monedaSeleccionada === 'todas' || moneda === monedaSeleccionada)
        .map(moneda => ({
            label: [moneda, ' Compra'],
            data: etiquetas.map(fecha => datosAgrupados[fecha][moneda].compra || 0),
            borderColor: colores[moneda] || 'black',
            backgroundColor: 'transparent',
            borderWidth: 1,
            fill: false
        }));

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
    });
}