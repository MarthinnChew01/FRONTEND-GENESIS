import React, { useState } from 'react';
import axios from 'axios';

export const TasaCambio = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [promedioCompra, setPromedioCompra] = useState(null);
  const [promedioVenta, setPromedioVenta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };

  const fetchPromedioTasaCambio = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:4200/tipo-cambio-rango?fecha_ini=${fechaInicio}&fecha_fin=${fechaFin}`);
      setPromedioCompra(response.data.promedioCompra);
      setPromedioVenta(response.data.promedioVenta);
    } catch (error) {
      setError('Error fetching data');
    }
    setLoading(false);
    handleGuardarClick()
  };

  const handleGuardarClick = async () => {
    try {
      const response = await axios.post('http://localhost:4200/guardar-tasa-cambio', {
        fecha_ini: fechaInicio,
        fecha_fin: fechaFin
      });
      console.log('Datos guardados exitosamente:', response.data.message);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };
  

  return (
    <div className="container text-center">
      <h1 className="mt-1" >Calcular Promedio de Tasa de Cambio</h1>
      <div>
        <label className="mt-1" htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          value={fechaInicio}
          onChange={handleFechaInicioChange}
          className="mt-1"
        />
      </div>
      <div>
        <label className="mt-1" htmlFor="fechaFin">Fecha de Fin:</label>
        <input
          type="date"
          id="fechaFin"
          value={fechaFin}
          onChange={handleFechaFinChange}
          className="mt-1 ml-2"
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={fetchPromedioTasaCambio}>CALCULAR PROMEDIO</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {promedioCompra && promedioVenta && (
        <div>
          <p className="mt-4" >Promedio de Tasa de Cambio de Compra: {promedioCompra}</p>
          <p>Promedio de Tasa de Cambio de Venta: {promedioVenta}</p>
          {/* <button onClick={handleGuardarClick}>Guardar</button> */}
        </div>
      )}
    </div>
  );
};

export default TasaCambio;
