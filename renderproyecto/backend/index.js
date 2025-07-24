const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas ejemplo (puedes cambiar o agregar más)
app.get('/api/peliculas', (req, res) => {
  res.json({ mensaje: 'Lista de películas aquí' });
});

app.post('/api/recomendaciones', (req, res) => {
  const { prompt } = req.body;
  // Aquí tu lógica con OpenRouter API o lo que tengas
  res.json({ recomendacion: `Respuesta para prompt: ${prompt}` });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
