import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { VariablesDisponibles } from './pages/VariablesDisponibles.jsx'
import TasaCambio from './pages/TasaCambio.jsx'
import GuardarTasaCambio from './pages/GuardarTasaCambio.jsx'
import TipoCambioFechaInicial from './pages/TipoCambioFechaInicial.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="container">
      <VariablesDisponibles />
      <TasaCambio/>
      <GuardarTasaCambio />
      <TipoCambioFechaInicial />
    </div>
  </React.StrictMode>,
)
