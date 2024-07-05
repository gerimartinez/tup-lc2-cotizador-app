let grafica; // Definimos la variable grafica en el ámbito global

document.addEventListener('DOMContentLoaded', function() {
    cargarMonedasGuardadas();
    document.getElementById("moneda").addEventListener("change", filtrarMonedas);
    document.getElementById("icono-moneda").addEventListener("click", cargarMonedasGuardadas);
});

function cargarMonedasGuardadas() {
    let monedasGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    mostrarMonedas(monedasGuardadas);
    actualizarGrafica(monedasGuardadas);
}

function mostrarMonedas(monedas) {
    let cotizacionesContainer = document.getElementById("cotizaciones-container");
    let sinDatos = document.getElementById("sinDatos");

    if (!cotizacionesContainer || !sinDatos) {
        console.error('Elementos cotizaciones-container o sinDatos no encontrados en el DOM.');
        return;
    }

    cotizacionesContainer.innerHTML = "";

    // Se muestra un mensaje si no hay datos guardados.
    if (monedas.length === 0) {
        sinDatos.style.display = "block";
    } else {
        sinDatos.style.display = "none";
    }

    let monedasPorNombre = {};

    // Organiza las monedas por nombre de moneda.
    monedas.forEach(moneda => {
        if (!monedasPorNombre[moneda.moneda]) {
            monedasPorNombre[moneda.moneda] = [];
        }
        monedasPorNombre[moneda.moneda].push(moneda);
    });

    // Crear las filas de la tabla.
    Object.keys(monedasPorNombre).forEach(nombreMoneda => {
        // Ordena las monedas por fecha en orden descendente.
        let monedasOrdenadas = monedasPorNombre[nombreMoneda].sort(function(a, b) {
            let fechaA = a.fecha.split('/').reverse().join('');
            let fechaB = b.fecha.split('/').reverse().join('');
            
            if (fechaA > fechaB) {
                return -1; // Coloca 'a' antes que 'b'
            } else if (fechaA < fechaB) {
                return 1; // Coloca 'b' antes que 'a'
            } else {
                return 0; // Si las fechas son iguales, se mantiene el orden.
            }
        });
        
        // Agrega las filas a la tabla HTML.
        monedasOrdenadas.forEach((moneda, index) => {
            let tr = document.createElement("div");
            tr.className = "fila-moneda";

            // Si es la primera moneda del nombre de moneda, agregar una celda que contenga todas las monedas de ese nombre.
            if (index === 0) {
                let tdMoneda = document.createElement("div");
                tdMoneda.className = "celdaMoneda";
                tdMoneda.textContent = nombreMoneda;
                tr.appendChild(tdMoneda);
            }

            // Crea y agrega la celda para la fecha.
            let tdFecha = document.createElement("div");
            tdFecha.textContent = moneda.fecha;
            tr.appendChild(tdFecha);

            // Crea y agrega la celda para el valor de compra.
            let tdCompra = document.createElement("div");
            tdCompra.textContent = "$" + moneda.compra;
            tr.appendChild(tdCompra);

            // Crea y agrega la celda para el valor de venta.
            let tdVenta = document.createElement("div");
            tdVenta.textContent = "$" + moneda.venta;
            tr.appendChild(tdVenta);

            // Crea y agrega la celda para la variación.
            let tdVariacion = document.createElement("div");
            let elementoVariacion = document.createElement("i");

            // Determina la dirección de la flecha de variación.
            if (index < monedasOrdenadas.length - 1) {
                let precioAnterior = monedasOrdenadas[index + 1].venta;
                if (moneda.venta > precioAnterior) {
                    elementoVariacion.className = "fa solid fa-arrow-up flechaSuba";
                } else if (moneda.venta < precioAnterior) {
                    elementoVariacion.className = "fa solid fa-arrow-down flechaBaja";
                } else {
                    elementoVariacion.textContent = "-";
                }
            } else {
                elementoVariacion.textContent = "-";
            }

            tdVariacion.appendChild(elementoVariacion);
            tr.appendChild(tdVariacion);

            // Agrega la fila a la tabla.
            cotizacionesContainer.appendChild(tr);
        });
    });
}

// Filtra las monedas mostradas según la selección del usuario.
function filtrarMonedas() {
    let monedasGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    let seleccion = document.getElementById("moneda").value;

    if (seleccion === "todas" || seleccion === "empty") {
        mostrarMonedas(monedasGuardadas);
        actualizarGrafica(monedasGuardadas);
    } else {
        let monedasFiltradas = monedasGuardadas.filter(moneda => moneda.moneda === seleccion);
        mostrarMonedas(monedasFiltradas);
        actualizarGrafica(monedasFiltradas);
    }
}

// Actualiza la gráfica de líneas con los datos de las monedas.
function actualizarGrafica(monedas) {
    let etiquetas = [];
    let datosPorMoneda = {};

    // Organiza las monedas por nombre y almacena todas las fechas únicas.
    monedas.forEach(moneda => {
        if (!datosPorMoneda[moneda.moneda]) {
            datosPorMoneda[moneda.moneda] = {};
        }
        datosPorMoneda[moneda.moneda][moneda.fecha] = moneda.venta;
        if (!etiquetas.includes(moneda.fecha)) {
            etiquetas.push(moneda.fecha);
        }
    });

    // Ordena las etiquetas de fechas en orden cronológico.
    function ordenarFechas(etiquetas) {
        etiquetas.sort((a, b) => {
            let [diaA, mesA, añoA] = a.split('/').reverse().map(Number);
            let [diaB, mesB, añoB] = b.split('/').reverse().map(Number);
    
            // Comparación directa basada en el formato dd/mm/yyyy
            if (añoA !== añoB) return añoA - añoB;
            if (mesA !== mesB) return mesA - mesB;
            return diaA - diaB;
        });
    }

    ordenarFechas(etiquetas);

    // Crea datasets para la gráfica por cada nombre de moneda.
    let datasets = Object.keys(datosPorMoneda).map(nombreMoneda => {
        let data = etiquetas.map(fecha => datosPorMoneda[nombreMoneda][fecha] || null);
        return {
            label: nombreMoneda,
            data: data,
            borderColor: getRandomColor(),
            fill: false
        };
    });

    // Destruye la gráfica existente si ya está creada.
    if (grafica) {
        grafica.destroy();
    }

    const ctx = document.getElementById("miGrafica1").getContext("2d");
    grafica = new Chart(ctx, {
        type: "line",
        data: {
            labels: etiquetas,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'DD/MM/YYYY'
                    }
                }
            }
        }
    });
}

// Sirve para conseguir un color aleatorio que luego será aplicado a la gráfica.
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}