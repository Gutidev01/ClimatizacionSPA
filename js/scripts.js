// Cargar el navbar y el footer desde archivos externos
window.onload = function() {
    loadComponent("navbar", "components/navbar.html");
    loadComponent("footer", "components/footer.html");

    setupAccordion();

    // Establecer la fecha actual en el campo de fecha "fecha-solicitud"
    const fechaHoy = new Date().toISOString().split('T')[0];
    const fechaSolicitudElement = document.getElementById('fecha-solicitud');

    if (fechaSolicitudElement) {
        fechaSolicitudElement.value = fechaHoy;
    }

    // Obtener el tipo de solicitud desde la URL (si está presente)
    const urlParams = new URLSearchParams(window.location.search);
    const tipoSolicitud = urlParams.get('tipo');

    if (tipoSolicitud) {
        const selectElement = document.getElementById('tipo-solicitud');
        if (selectElement) {
            const optionToSelect = Array.from(selectElement.options).find(
                option => option.value.toLowerCase() === tipoSolicitud.toLowerCase()
            );
            if (optionToSelect) {
                optionToSelect.selected = true;
            }
        }
    }
};

// Función mejorada para cargar componentes externos como navbar y footer
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el componente: ' + filePath);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error('Elemento con ID ' + elementId + ' no encontrado');
            }
        })
        .catch(error => console.error(error));
}

// Configurar el comportamiento del acordeón
function setupAccordion() {
    const accordions = document.querySelectorAll('.accordion-button');
    accordions.forEach(button => {
        button.addEventListener('mouseover', () => {
            const content = button.nextElementSibling;
            button.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
        });
        button.addEventListener('mouseout', () => {
            const content = button.nextElementSibling;
            button.classList.remove('active');
            content.style.maxHeight = "0";
        });
    });
}

// Añadir smooth scroll para los enlaces con anclas
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});