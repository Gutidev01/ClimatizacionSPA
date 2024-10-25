// Cargar el SDK de Supabase desde el CDN en tu HTML (asegúrate de tener la línea en tu HTML):
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/dist/supabase.min.js"></script>

// Inicializar Supabase
const supabaseUrl = "https://xuhfzsxwmiqkldbsvswq.supabase.co";  // Reemplaza con tu URL de Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1aGZ6c3h3bWlxa2xkYnN2c3dxIiwicm9sSI6ImFub24iLCJpYXQiOjE3Mjk4MTM3MTcsImV4cCI6MjA0NTM4OTcxN30.lmcJ4Mlti9FmXds1fj6IeBRPFnlFSGXPl2XguAwVyLw";  // Reemplaza con tu clave pública (anon key)
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Función para insertar un nuevo usuario
async function insertarUsuario(rut, nombres, apellidos, user_tipo, email, telefono, direccion, comuna, region, fecha_nacimiento, contraseña) {
    const { data, error } = await supabase
        .from('usuarios')
        .insert([
            {
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
            }
        ]);

    if (error) {
        console.error('Error insertando el usuario:', error);
        alert('Error al registrar el usuario. Inténtalo de nuevo.');
    } else {
        console.log('Usuario insertado con éxito:', data);
        alert('Usuario registrado exitosamente.');
    }
}

// Función para capturar los datos del formulario y registrar al usuario
function registrarUsuario(event) {
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

    // Llamar a la función para insertar el usuario en Supabase
    insertarUsuario(rut, nombres, apellidos, user_tipo, email, telefono, direccion, comuna, region, fecha_nacimiento, contraseña);
}

// Asignar el evento de submit al formulario de registro
const registerForm = document.querySelector('form');
if (registerForm) {
    registerForm.addEventListener('submit', registrarUsuario);
}



fetch('https://www.flow.cl/api/payment/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {TOKEN_API}',  // Reemplaza con tu token de API de Flow
    },
    body: JSON.stringify({
        commerceOrder: 'ORD123',
        subject: 'Pago de servicios',
        amount: 50000,  // Monto en CLP
        email: 'email@cliente.com',
        urlReturn: 'https://tusitio.com/pago-exitoso',
        urlConfirmation: 'https://tusitio.com/api/confirmacion',
    })
})
    .then(response => response.json())
    .then(data => {
        window.location.href = data.url;  // Redirigir al checkout de Flow
    })
    .catch(error => console.error('Error en la transacción:', error));
