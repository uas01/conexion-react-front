import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import datos from './datos.json';
import datos from './assets/datos.json';

function App() {
  const [data, setData] = useState([]);
  const [loadingFromBackend, setLoadingFromBackend] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  /*
  useEffect(() => {
    axios.get('http://localhost:8080/api/data/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        console.log('Cargando datos desde el fichero json');
        setData(datos);
      });
  }, []);
  */
  const cargarDatos = () => {
    axios.get('http://localhost:8080/api/data/')
      .then(response => {
        setData(response.data);
        setLoadingFromBackend(true);
      })
      .catch(error => {
        console.error('Error al obtener los datos desde el backend:', error);
        console.log('Cargando datos desde el archivo JSON...');
        setData(datos);
        setLoadingFromBackend(false);
      });
  };

  return (
    <div>
      <h1>{loadingFromBackend ? 'Datos desde Backend' : 'Datos desde JSON'}</h1>
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
              <td>{item.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
