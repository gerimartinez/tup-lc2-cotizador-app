document.addEventListener('DOMContentLoaded', function() {
    let informes = localStorage.getItem('informes');
    if (informes) {
        informes = JSON.parse(informes); //paso a obj
        console.log(informes)
        const tablaBody = document.querySelector('.tabla tbody');

        if (informes.length > 0) {

            informes.forEach(informe => {
                const fechaSinHora = informe.date.split(' ')[0];

                const filaCotizacion = document.createElement('tr');
                filaCotizacion.classList.add('celda-contenido');
                filaCotizacion.setAttribute('data-id', informe.id);
                filaCotizacion.innerHTML = `
                    <th class='celda-fecha'>${fechaSinHora}</th>
                    <td class>${informe.name}</td>
                    <td>${informe.data.compra}</td>
                    <td>${informe.data.venta}</td>
                    <td class="eliminar"><i class="fa-solid fa-circle-xmark" data-id="${informe.id}"></i></td>
                    
                `;
                tablaBody.appendChild(filaCotizacion);

            const btnEliminar = filaCotizacion.querySelector('.eliminar');
                btnEliminar.addEventListener('click', function() {
                    const nombre = informe.data.nombre;
                    const fecha = informe.date;

                    Swal.fire({
                        title: '¿Estas seguro?',
                        text: 'Esta acción eliminara la cotización permanentemente.',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, eliminar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            eliminarCotizacion(nombre, fecha);
                            Swal.fire(
                                '¡Eliminado!',
                                'La cotización ha sido eliminada.',
                                'success'
                            ).then(() => {
                                filaCotizacion.remove();
                            });
                        }
                    });
                });
            });
        } else {
            const filaMensaje = document.createElement('tr');
            filaMensaje.innerHTML = '<td colspan="5">No hay cotizaciones guardadas.</td>';
            tablaBody.appendChild(filaMensaje);
        }
    } else {
        const tablaBody = document.querySelector('.tabla tbody');
        const filaMensaje = document.createElement('tr');
        filaMensaje.innerHTML = '<td colspan="5">No hay cotizaciones guardadas.</td>';
        tablaBody.appendChild(filaMensaje);
    }

    function eliminarCotizacion(nombre, fecha) {
        let informes = localStorage.getItem('informes');
        if (informes) {
            informes = JSON.parse(informes);
            informes = informes.filter(informe => informe.data.nombre !== nombre || informe.date !== fecha);
            localStorage.setItem('informes', JSON.stringify(informes));
        }
    }

});

//IMPRIMIR LA VISTA ACTUAL
document.addEventListener('DOMContentLoaded', function() {
    // Código existente...
    // Asocia el evento click al botón de imprimir
    const btnImprimir = document.getElementById('btnImprimirVista');
    if (btnImprimir) {
        btnImprimir.addEventListener('click', function() {
            imprSelec('vistaActual');
        });
    }
});
// Función imprSelec
function imprSelec(nombre) {
    var elemento = document.getElementById(nombre);

    if (!elemento) {
        console.error("Elemento con ID '" + nombre + "' no encontrado.");
        return;
    }

    var contenido = elemento.innerHTML;
    console.log("Contenido a imprimir:", contenido);

    var contenidoOriginal = document.body.innerHTML;

    var estiloImpresion = `
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: center;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>`;
    document.body.innerHTML = estiloImpresion + contenido;
    window.print();
    document.body.innerHTML = contenidoOriginal;
}