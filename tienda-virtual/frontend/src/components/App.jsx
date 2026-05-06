import { useState, useEffect } from 'react';
import api from '../api';
import Dashboard from './Dashboard';
import Inventario from './Inventario';
import Ventas from './Ventas';
import Finanzas from './Finanzas';
import Reportes from './Reportes';
import './App.css';

export default function AppMain({ usuario, onLogout }) {
  const [seccionActual, setSeccionActual] = useState('dashboard');
  const [datos, setDatos] = useState({
    prendas: [],
    ventas: [],
    dashboard: {}
  });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const [prendas, ventas, dashboard] = await Promise.all([
        api.get('/prendas'),
        api.get('/ventas'),
        api.get('/reportes/dashboard')
      ]);
      setDatos({
        prendas: prendas.data,
        ventas: ventas.data,
        dashboard: dashboard.data
      });
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setCargando(false);
    }
  };

  const recargar = () => {
    cargarDatos();
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>🛍️ {usuario.negocioNombre || 'Mi Tienda Virtual'}</h1>
          <p className="bienvenida">Hola, {usuario.nombre}</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Cerrar sesión
        </button>
      </nav>

      <div className="main-content">
        <aside className="sidebar">
          <button
            className={`tab-btn ${seccionActual === 'dashboard' ? 'active' : ''}`}
            onClick={() => setSeccionActual('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`tab-btn ${seccionActual === 'inventario' ? 'active' : ''}`}
            onClick={() => setSeccionActual('inventario')}
          >
            👕 Inventario
          </button>
          <button
            className={`tab-btn ${seccionActual === 'ventas' ? 'active' : ''}`}
            onClick={() => setSeccionActual('ventas')}
          >
            💰 Ventas
          </button>
          <button
            className={`tab-btn ${seccionActual === 'finanzas' ? 'active' : ''}`}
            onClick={() => setSeccionActual('finanzas')}
          >
            💵 Finanzas
          </button>
          <button
            className={`tab-btn ${seccionActual === 'reportes' ? 'active' : ''}`}
            onClick={() => setSeccionActual('reportes')}
          >
            📋 Reportes
          </button>
        </aside>

        <main className="content">
          {cargando ? (
            <div className="loading">Cargando datos...</div>
          ) : (
            <>
              {seccionActual === 'dashboard' && <Dashboard data={datos.dashboard} />}
              {seccionActual === 'inventario' && <Inventario prendas={datos.prendas} onRecargar={recargar} />}
              {seccionActual === 'ventas' && <Ventas prendas={datos.prendas} ventas={datos.ventas} onRecargar={recargar} />}
              {seccionActual === 'finanzas' && <Finanzas ventas={datos.ventas} prendas={datos.prendas} />}
              {seccionActual === 'reportes' && <Reportes ventas={datos.ventas} prendas={datos.prendas} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
