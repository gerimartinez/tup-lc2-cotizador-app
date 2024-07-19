const urls = [
    { name: 'Dolar Oficial', url: 'https://dolarapi.com/v1/dolares/oficial' },
    { name: 'Dolar Blue', url: 'https://dolarapi.com/v1/dolares/blue' },
    { name: 'Dolar Bolsa', url: 'https://dolarapi.com/v1/dolares/bolsa' },
    { name: 'Dolar CCL', url: 'https://dolarapi.com/v1/dolares/contadoconliqui' },
    { name: 'Dolar Tarjeta', url: 'https://dolarapi.com/v1/dolares/tarjeta' },
    { name: 'Dolar Mayorista', url: 'https://dolarapi.com/v1/dolares/mayorista' },
    { name: 'Dolar Cripto', url: 'https://dolarapi.com/v1/dolares/cripto' },
    { name: 'Euro', url: 'https://dolarapi.com/v1/cotizaciones/eur' },
    { name: 'Real Brasileño', url: 'https://dolarapi.com/v1/cotizaciones/brl' },
    { name: 'Peso Chileno', url: 'https://dolarapi.com/v1/cotizaciones/clp' },
    { name: 'Peso Uruguayo', url: 'https://dolarapi.com/v1/cotizaciones/uyu' }
];
const fetchData = async () => {
    try {
        const responses = await Promise.all(urls.map(obj => fetch(obj.url).then(res => res.json())));
        const data = urls.map((obj, index) => ({
            name: obj.name,
            data: {
                ...responses[index],
                date: new Date().toLocaleDateString()
            }
        }));
        populateTable(data);
        showLastUpdated();
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('error-message').style.display = 'block';
    }
};

document.getElementById('buscar').addEventListener('click', () => {
    const selectedCurrency = document.getElementById('moneda').value;
    if (selectedCurrency === 'todas') {
        fetchData();
    } else {
        const currencyMap = {
            'dolar-oficial': 'Dolar Oficial',
            'dolar-blue': 'Dolar Blue',
            'dolar-bolsa': 'Dolar Bolsa',
            'dolar-ccl': 'Dolar CCL',
            'dolar-tarjeta': 'Dolar Tarjeta',
            'dolar-mayorista': 'Dolar Mayorista',
            'dolar-cripto': 'Dolar Cripto',
            'euro': 'Euro',
            'real': 'Real Brasileño',
            'peso-chileno': 'Peso Chileno',
            'peso-uruguayo': 'Peso Uruguayo'
        };

        const currencyName = currencyMap[selectedCurrency];
        const url = urls.find(u => u.name === currencyName)?.url;
        if (url) {
            fetchSingleData(url, currencyName);
        }
    }
});

const fetchSingleData = async (url, selectedCurrency) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        populateTable([{ name: selectedCurrency, data }]);
        showLastUpdated();
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('error-message').style.display = 'block';
    }
};

const populateTable = (data) => {
    const container = document.getElementById('cotizaciones-container');
    container.innerHTML = '';

    data.forEach(item => {
        const cotizacionDiv = document.createElement('div');
        cotizacionDiv.className = 'cotizacion';

        const nameDiv = document.createElement('div');
        nameDiv.textContent = item.name;
        cotizacionDiv.appendChild(nameDiv);

        const contenedorPrecioDiv = document.createElement('div');
        contenedorPrecioDiv.className = 'contenedor-precio';

        const contTitleDiv = document.createElement('div');
        contTitleDiv.className = 'cont-title';

        const compraTitleP = document.createElement('p');
        compraTitleP.textContent = 'Compra';
        contTitleDiv.appendChild(compraTitleP);

        const ventaTitleP = document.createElement('p');
        ventaTitleP.textContent = 'Venta';
        contTitleDiv.appendChild(ventaTitleP);

        contenedorPrecioDiv.appendChild(contTitleDiv);

        const contPrecioDiv = document.createElement('div');
        contPrecioDiv.className = 'cont-precio';

        const compraP = document.createElement('p');
        compraP.textContent = item.data.compra ? `$${item.data.compra}` : 'N/A';
        contPrecioDiv.appendChild(compraP);

        const ventaP = document.createElement('p');
        ventaP.textContent = item.data.venta ? `$${item.data.venta}` : 'N/A';
        contPrecioDiv.appendChild(ventaP);

        contenedorPrecioDiv.appendChild(contPrecioDiv);

        cotizacionDiv.appendChild(contenedorPrecioDiv);

        const botonDiv = document.createElement('div');
        botonDiv.className = 'contenedor-boton';

        const button = document.createElement('button');
        button.addEventListener('click', () => addToInforme(item));
        const starIcon = document.createElement('i');
        starIcon.className = 'fa-solid fa-star';
        button.appendChild(starIcon);

        botonDiv.appendChild(button);

        cotizacionDiv.appendChild(botonDiv);

        container.appendChild(cotizacionDiv);
    });
};

const addToInforme = (item) => {
    const informes = JSON.parse(localStorage.getItem('informes')) || [];
    const todayDate = new Date().toLocaleDateString(); // Obtener solo la fecha sin la hora
    const existing = informes.find(informe => 
        informe.name === item.name && 
        informe.date === todayDate // Comparar solo la fecha sin la hora
    );

    if (existing) {
        alert('La cotización ya se encuentra almacenada.');
    } else {
        const newItem = {
            ...item,
            date: todayDate // Guardar solo la fecha sin la hora
        };
        informes.push(newItem);
        localStorage.setItem('informes', JSON.stringify(informes));
        alert('Cotización agregada correctamente.');
    }
};

const showLastUpdated = () => {
    const lastUpdated = new Date().toLocaleDateString(); // Mostrar solo la fecha sin la hora
    document.getElementById('last-updated').textContent = `Datos actualizados al: ${lastUpdated}`;
};

window.onload = fetchData;
setInterval(fetchData, 300000); // Actualizar cada 5 minutos