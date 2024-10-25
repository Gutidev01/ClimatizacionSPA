// Función para capturar los datos del formulario de login
async function loginUsuario(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de forma tradicional

    // Capturar los datos del formulario
    const email = document.querySelector('input[name="email"]').value;
    const contraseña = document.querySelector('input[name="contraseña"]').value;

    const data = { email, contraseña };

    try {
        // Enviar los datos al servidor para autenticar
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();

            // Almacenar los datos del usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(result.usuario));

            // Redirigir a la página principal
            alert('Login exitoso');
            window.location.href = 'index.html';
        } else {
            const errorMsg = await response.text();
            alert(`Error: ${errorMsg}`);
        }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        alert('Ocurrió un error al intentar iniciar sesión. Inténtelo de nuevo más tarde.');
    }
}

// Asignar el evento de submit al formulario de login
const loginForm = document.querySelector('#loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', loginUsuario);
}
