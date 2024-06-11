import React, { useState } from 'react';
import axios from 'axios';

export const GuardarTasaCambio = () => {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVariables = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:4200/get-tasa-cambio');
      setVariables(response.data); // Aquí establecemos todo el objeto de datos
    } catch (error) {
      setError('Error fetching data');
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Tasas de Cambio Guardadas</h1>
      <div className="mb-4">
        <button className="btn btn-primary" onClick={fetchVariables}>ACTUALIZAR</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table className="table table-striped mx-auto">
        <thead>
          <tr>
            <th>No. Petición</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>TC Venta</th>
            <th>TC Compra</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable, index) => (
            <tr key={index}>
              <td>{variable.idtasa_cambio}</td>
              <td>{formatDate(variable?.fecha_inicio)}</td>
              <td>{formatDate(variable?.fecha_fin)}</td>
              <td>{variable.promedio_compra}</td>
              <td>{variable.promedio_venta}</td>
            </tr>
          ))}
        </tbody>
      </table><hr />
    </div>
  );
};

export default GuardarTasaCambio;
