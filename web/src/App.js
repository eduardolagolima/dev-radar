import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    // Adiciona apenas se o dev não estiver no array de devs
    if (!devs.some(dev => dev._id === response.data._id)) {
      setDevs([...devs, response.data]);
    }
  }

  async function handleRemoveDev(_id) {
    const response = await api.delete(`/devs/${_id}`);

    // Remove o dev que foi deletado do array de devs
    setDevs([...devs.filter(dev => dev._id !== response.data._id)]);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              onClickDeleteIcon={handleRemoveDev}
              key={dev._id}
              dev={dev}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
