import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export const VariablesDisponibles = () => {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVariables = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:4200/variables-disponibles');
      setVariables(response.data.VariablesDisponiblesResult.Variables.Variable);
    } catch (error) {
      setError('Error fetching data');
    }
    setLoading(false);
  };

  return (
    <div className="container text-center">
      <h1 className="mb-4">Variables Disponibles</h1>
      <div className="mb-4">
        <button className="btn btn-primary" onClick={fetchVariables}>VER TABLA</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table className="table table-striped mx-auto">
        <thead>
          <tr>
            <th>Variable</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable, index) => (
            <tr key={index}>
              <td>{variable.moneda}</td>
              <td>{variable.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default VariablesDisponibles;
