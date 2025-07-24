import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [recomendacion, setRecomendacion] = useState('');

  useEffect(() => {
    fetch('https://recomendaciones-backend.onrender.com/api/peliculas')
      .then(response => response.json())
      .then(data => setPeliculas(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://recomendaciones-backend.onrender.com/api/recomendaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      setRecomendacion(data.recomendacion);
    } catch (error) {
      console.error('Error al obtener recomendación:', error);
      setRecomendacion('Error al obtener recomendación');
    }
  };

  return (
    <div className="App">
      <h1>Películas</h1>
      <ul>
        {peliculas.map((peli) => (
          <li key={peli._id}>{peli.titulo}</li>
        ))}
      </ul>

      <h2>Obtener recomendación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu pregunta..."
          required
        />
        <button type="submit">Enviar</button>
      </form>

      {recomendacion && (
        <div>
          <h3>Recomendación:</h3>
          <p>{recomendacion}</p>
        </div>
      )}
    </div>
  );
}

export default App;
