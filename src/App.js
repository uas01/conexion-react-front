import React, { useState, useEffect } from 'react';
import { createClient } from '@libsql/client';

function App() {
  const [data, setData] = useState([]);
  const [loadingFromBackend, setLoadingFromBackend] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    const client = createClient({
      url: "libsql://react-uas01.turso.io",
      authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTIzMzk4OTQsImlkIjoiYmFjOGZhMjgtZmY0MC00NjE2LTlhNTYtODc1ZjM3NzllNDliIn0.IYs1SQExmOaMdndjdbk1QWW5FnZdphusxkbs_3764H_bXLTjerJ3aHSq90oP0R39rb32PPKgbVpdf08LAtw7AQ",
    });

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
      <h1>{loadingFromBackend ? 'Datos desde Backend' : 'Cargando...'}</h1>
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
