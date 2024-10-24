// Carga el navbar y el footer desde sus respectivos archivos HTML
window.onload = function() {
    loadComponent("navbar", "components/navbar.html");
    loadComponent("footer", "components/footer.html");
    setupAccordion();
};

// Función para cargar componentes externos (navbar y footer)
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => document.getElementById(elementId).innerHTML = data);
}

// Función para configurar el acordeón
function setupAccordion() {
    const accordions = document.querySelectorAll('.accordion-button');

    accordions.forEach(button => {
        button.addEventListener('mouseover', () => {
            const content = button.nextElementSibling;
            button.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";  // Ajustamos la altura máxima según el contenido
        });

        button.addEventListener('mouseout', () => {
            const content = button.nextElementSibling;
            button.classList.remove('active');
            content.style.maxHeight = "0";  // Colapsamos el contenido
        });
    });
}


// Aquí puedes agregar interacciones como desplazamiento suave o animaciones
document.addEventListener('DOMContentLoaded', function() {
    // Añadir smooth scroll al hacer clic en los links de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
