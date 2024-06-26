document.addEventListener('DOMContentLoaded', function() {
    let informes = localStorage.getItem('informes');
    if (informes) {
        informes = JSON.parse(informes); //paso a obj
        console.log(informes)
        const tablaBody = document.querySelector('.tabla tbody');

        if (informes.length > 0) {

            informes.forEach(informe => {
                const fechaSinHora = informe.date.split(',')[0];

                const filaCotizacion = document.createElement('tr');
                filaCotizacion.classList.add('celda-contenido');
                filaCotizacion.innerHTML = `
                    <th class='celda-fecha'>${fechaSinHora}</th>
                    <td class>${informe.data.nombre}</td>
                    <td>${informe.data.compra}</td>
                    <td>${informe.data.venta}</td>
                    <td class="eliminar"><i class="fa-solid fa-circle-xmark" data-id="${informe.id}"></i></td>
                    
                `;
                tablaBody.appendChild(filaCotizacion);

            const btnEliminar = filaCotizacion.querySelector('.eliminar');
                btnEliminar.addEventListener('click', function() {
                    const id = informe.id;
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
                            eliminarCotizacion(id);
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

    function eliminarCotizacion(id) {
        let informes = localStorage.getItem('informes');
        
        if (informes) {
            informes = JSON.parse(informes);
            informes = informes.filter(informe => informe.id !== id);
            localStorage.setItem('informes', JSON.stringify(informes));
        }
    }
});
