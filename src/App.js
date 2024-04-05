import React, { useState, useEffect } from 'react';
import { createClient } from '@libsql/client';
import bd from './assets/bd.json';


function App() {
  const [data, setData] = useState([]);
  const [loadingFromBackend, setLoadingFromBackend] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    const client = createClient({
      url: bd.url,
      authToken: bd.authToken,
    });
;

    
    {data.map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
      </tr>
    ))}

    client.execute("SELECT * FROM user")
      .then(result => {
        const rows = result.rows;
        setData(rows);
        setLoadingFromBackend(true);
      })
      .catch(error => {
        console.error('Error al obtener los datos desde la base de datos:', error);
        setLoadingFromBackend(false);
      })
      .finally(() => {
        client.close();
      });
  };

  return (
    <div>
      <h1>{loadingFromBackend ? 'Lista usuarios BBDD' : 'Cargando...'}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
