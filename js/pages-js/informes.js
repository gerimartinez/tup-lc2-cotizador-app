
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
}