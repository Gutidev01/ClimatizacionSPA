// Función para capturar los datos del formulario y registrar al usuario
async function registrarUsuario(event) {
    event.preventDefault();  // Evita el refresco de la página

    // Capturar datos del formulario
    const rut = document.querySelector('input[placeholder="RUT"]').value;
    const nombres = document.querySelector('input[placeholder="Nombres"]').value;
    const apellidos = document.querySelector('input[placeholder="Apellidos"]').value;
    const user_tipo = document.querySelector('select').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const telefono = document.querySelector('input[placeholder="Teléfono"]').value;
    const direccion = document.querySelector('input[placeholder="Dirección"]').value;
    const comuna = document.querySelector('input[placeholder="Comuna"]').value;
    const region = document.querySelector('input[placeholder="Región"]').value;
    const fecha_nacimiento = document.querySelector('input[type="date"]').value;
    const contraseña = document.querySelector('input[placeholder="Contraseña"]').value;
    const confirmar_contraseña = document.querySelector('input[placeholder="Confirmar Contraseña"]').value;

    // Validar que ambas contraseñas coincidan
    if (contraseña !== confirmar_contraseña) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;  // Detener el proceso si las contraseñas no coinciden
    }

    // Preparar los datos en formato JSON
    const data = {
        rut: rut,
        nombres: nombres,
        apellidos: apellidos,
        user_tipo: user_tipo,
        email: email,
        telefono: telefono,
        direccion: direccion,
        comuna: comuna,
        region: region,
        fecha_nacimiento: fecha_nacimiento,
        contraseña: contraseña
    };

    // Enviar los datos al servidor usando fetch para registrar al usuario en MySQL
    try {
        const response = await fetch('http://localhost:3000/register', {  // Asegúrate de que esta URL sea correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Usuario registrado con éxito');
            // Limpiar el formulario después del registro exitoso
            document.querySelector('form').reset();
            // Redirigir al usuario a la página de inicio
            window.location.href = 'index.html';  // Cambia 'index.html' por la ruta correcta de tu página de inicio
        } else {
            const errorMsg = await response.text();
            alert(`Error: ${errorMsg}`);
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Ocurrió un error al intentar registrar el usuario. Por favor, inténtelo de nuevo más tarde.');
    }
}

// Asignar el evento de submit al formulario de registro
const registerForm = document.querySelector('form');
if (registerForm) {
    registerForm.addEventListener('submit', registrarUsuario);
}

// Función para gestionar la transacción de pago con Flow
async function iniciarTransaccion() {
    try {
        const response = await fetch('https://www.flow.cl/api/payment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer {TOKEN_API}',  // Reemplaza con tu token de API de Flow
            },
            body: JSON.stringify({
                commerceOrder: 'ORD123',  // ID de la orden
                subject: 'Pago de servicios',  // Descripción del pago
                amount: 50000,  // Monto en CLP
                email: 'email@cliente.com',
                urlReturn: 'https://tusitio.com/pago-exitoso',  // URL de retorno tras pago exitoso
                urlConfirmation: 'https://tusitio.com/api/confirmacion',  // URL para confirmación del pago
            })
        });

        const data = await response.json();
        window.location.href = data.url;  // Redirigir al checkout de Flow para completar el pago
    } catch (error) {
        console.error('Error en la transacción:', error);
        alert('Ocurrió un error durante la transacción de pago. Inténtelo de nuevo más tarde.');
    }
}
