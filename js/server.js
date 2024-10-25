const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configurar la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',      // Cambia esto si tu servidor MySQL está en otro lugar
  user: 'root',           // Cambia por el usuario de tu base de datos
  password: '',           // Cambia por la contraseña de tu base de datos
  database: 'tu_base_de_datos' // Cambia por el nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Middleware para procesar datos JSON
app.use(express.json());

// Ruta de prueba para obtener datos
app.get('/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para insertar un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { rut, nombres, apellidos, email, telefono, direccion } = req.body;
  const query = 'INSERT INTO usuarios (rut, nombres, apellidos, email, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [rut, nombres, apellidos, email, telefono, direccion], (err, results) => {
    if (err) {
      console.error('Error insertando datos:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      res.json({ message: 'Usuario registrado con éxito', id: results.insertId });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
