import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories',).then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: `https://github.com/Repo${Date.now()}`,
      techs: ["Node.js", "JS"]
    })

    const repository = response.data;

    setRepositories([ ...repositories, repository ]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`, {});
  }

  async function handleUpdateRepository(id, likes) {
    const response = await api.put(`/repositories/${id}`, {
      title: `Novo Repositorio ${Date.now()}`,
      url: `https://github.com/Repo${Date.now()}`,
      techs: ["Node.js", "JS"]
    })

    setRepositories(repositories);
  }

  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`, {});
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <br/>Likes: {repository.likes}
            <button onClick={() => handleLikeRepository(`${repository.id}`)}>
              Gostar
            </button>
            <button onClick={() => handleUpdateRepository(`${repository.id}`, `${repository.likes}`)}>
              Actualizar
            </button>
            <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
              Remover
            </button>


          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
