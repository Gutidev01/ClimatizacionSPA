window.onload = function() {
    // Llenar los selectores de marca y modelo cuando se cargue la página
    llenarSelectores();

    // Establecer la fecha actual en el campo de fecha "fecha-solicitud"
    const fechaHoy = new Date().toISOString().split('T')[0];
    const fechaSolicitudElement = document.getElementById('fecha-solicitud');

    if (fechaSolicitudElement) {
        fechaSolicitudElement.value = fechaHoy;
    }
};

function llenarSelectores() {
    const marcaSelect = document.getElementById('marca');
    const modeloSelect = document.getElementById('modelo');

    // Cambia la URL para apuntar a tu servidor Node.js en el puerto correcto
    fetch('http://localhost:3000/api/productos')
        .then(response => response.json())
        .then(data => {
            const marcas = new Set();

            // Llenar el selector de marcas y almacenar los modelos por marca
            data.forEach(producto => {
                marcas.add(producto.marca);
            });

            // Añadir las marcas al selector de marca
            marcas.forEach(marca => {
                const option = document.createElement('option');
                option.value = marca;
                option.textContent = marca;
                marcaSelect.appendChild(option);
            });

            // Cambiar los modelos cuando se selecciona una marca
            marcaSelect.addEventListener('change', function () {
                const marcaSeleccionada = marcaSelect.value;
                modeloSelect.innerHTML = '<option value="">Seleccionar Modelo</option>'; // Limpiar opciones previas

                data.forEach(producto => {
                    if (producto.marca === marcaSeleccionada) {
                        const option = document.createElement('option');
                        option.value = producto.modelo;
                        option.textContent = producto.modelo;
                        modeloSelect.appendChild(option);
                    }
                });
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

