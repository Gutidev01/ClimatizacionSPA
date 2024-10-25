// Importar los módulos necesarios
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Crear una aplicación de Express
const app = express();

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Configurar MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tatada123*',  // Cambia si tienes una contraseña en MySQL
  database: 'climatispa'
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Configurar el servidor para recibir datos en formato JSON
app.use(express.json());

// Ruta para registrar usuarios
app.post('/register', async (req, res) => {
  const { rut, nombres, apellidos, user_tipo, email, telefono, direccion, comuna, region, fecha_nacimiento, contraseña } = req.body;

  if (!rut || !nombres || !apellidos || !user_tipo || !email || !contraseña) {
    return res.status(400).send('Faltan campos obligatorios');
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const sql = 'INSERT INTO usuarios (rut, nombres, apellidos, user_tipo, email, telefono, direccion, comuna, region, fecha_nacimiento, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [rut, nombres, apellidos, user_tipo, email, telefono, direccion, comuna, region, fecha_nacimiento, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error insertando usuario:', err);
        return res.status(500).send('Error al registrar el usuario');
      }
      res.status(200).send('Usuario registrado con éxito');
    });
  } catch (err) {
    console.error('Error al codificar la contraseña:', err);
    return res.status(500).send('Error al registrar el usuario');
  }
});

// Ruta para login
app.post('/login', (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = results[0];

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      message: 'Login exitoso',
      usuario: {
        rut: usuario.rut,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email,
        user_tipo: usuario.user_tipo,
        telefono: usuario.telefono
      }
    });
  });
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
