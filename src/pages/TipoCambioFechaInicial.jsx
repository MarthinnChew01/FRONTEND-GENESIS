import React, { useState } from 'react';
import axios from 'axios';

const TipoCambioFechaInicial = () => {
  const [fechaIni, setFechaIni] = useState('');
  const [tasas, setTasas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleFechaIniChange = (event) => {
    setFechaIni(event.target.value);
  };

  const fetchTipoCambio = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:4200/tipo-cambio-fecha-inicial', {
        params: {
          fecha_ini: fechaIni,
          page: page,
          limit: 10,
        },
      });
      setTasas(response.data.tasas);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError('Error fetching data');
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchTipoCambio(page);
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Tipo de Cambio por Fecha Inicial</h1>
      <div className="mb-4">
        <label htmlFor="fechaIni">Fecha de Inicio:</label>
        <input
          type="date"
          id="fechaIni"
          value={fechaIni}
          onChange={handleFechaIniChange}
          className="mlt-1"
        />
      </div>
      <button className="btn btn-primary" onClick={() => fetchTipoCambio(1)}>
        OBTENER TIPO CAMBIO
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {tasas.length > 0 && (
        <>
          <table className="table table-striped mx-auto mt-4">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Venta</th>
                <th>Compra</th>
              </tr>
            </thead>
            <tbody>
              {tasas.map((tasa, index) => (
                <tr key={index}>
                  <td>{tasa.fecha}</td>
                  <td>{tasa.venta}</td>
                  <td>{tasa.compra}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <button
        className="btn btn-secondary mx-1"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="mx-2">Página {currentPage} de {totalPages}</span>
      <button
        className="btn btn-secondary mx-1"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default TipoCambioFechaInicial;
