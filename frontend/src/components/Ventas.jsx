import { useState } from 'react';
import api from '../api';

export default function Ventas({ prendas, ventas, onRecargar }) {
  const [form, setForm] = useState({
    prendaId: '',
    color: '',
    cantidad: '1',
    fecha: new Date().toISOString().split('T')[0]
  });
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Cuando cambias de prenda, reset el color
  const handlePrendaChange = (e) => {
    setForm({
      ...form,
      prendaId: e.target.value,
      color: ''
    });
  };

  const registrarVenta = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      await api.post('/ventas', {
        prendaId: form.prendaId,
        color: form.color,
        cantidad: parseInt(form.cantidad),
        fecha: form.fecha
      });

      setForm({
        prendaId: '',
        color: '',
        cantidad: '1',
        fecha: new Date().toISOString().split('T')[0]
      });
      setMensaje({ tipo: 'success', texto: '✅ Venta registrada correctamente' });
      onRecargar();

      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: `❌ ${error.response?.data?.error || 'Error al registrar venta'}` });
    } finally {
      setCargando(false);
    }
  };

  // Obtener la prenda seleccionada
  const prendaSeleccionada = prendas.find(p => p._id === form.prendaId);

  // Obtener colores disponibles de la prenda seleccionada
  const coloresDisponibles = prendaSeleccionada ? prendaSeleccionada.colores.filter(c => c.cantidad > 0) : [];

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>💰 Registrar Ventas</h2>

      {mensaje && (
        <div className={mensaje.tipo === 'success' ? 'success' : 'error'}>
          {mensaje.texto}
        </div>
      )}

      <div className="card">
        <div className="card-title">📝 Nueva venta</div>

        <form onSubmit={registrarVenta}>
          <div className="form-group">
            <label className="form-label">¿Qué prenda vendiste?</label>
            <select
              name="prendaId"
              value={form.prendaId}
              onChange={handlePrendaChange}
              required
            >
              <option value="">-- Selecciona una prenda --</option>
              {prendas.map((prenda) => (
                <option key={prenda._id} value={prenda._id}>
                  {prenda.nombre} - Bs. {Math.round(prenda.precio)}
                </option>
              ))}
            </select>
          </div>

          {prendaSeleccionada && (
            <div className="form-group">
              <label className="form-label">🎨 Color</label>
              <select
                name="color"
                value={form.color}
                onChange={handleChange}
                required
              >
                <option value="">-- Selecciona un color --</option>
                {prendaSeleccionada.colores.map((color) => (
                  <option key={color.nombre} value={color.nombre}>
                    {color.nombre} ({color.cantidad} disponibles)
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="row">
            <div className="form-group">
              <label className="form-label">Cantidad vendida</label>
              <input
                type="number"
                name="cantidad"
                value={form.cantidad}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={cargando} style={{ width: '100%' }}>
            {cargando ? 'Guardando...' : '✅ Guardar venta'}
          </button>
        </form>
      </div>

      <div className="card">
        <div className="card-title">📋 Últimas ventas</div>

        {ventas.length === 0 ? (
          <p style={{ color: '#999' }}>No hay ventas registradas aún</p>
        ) : (
          <div>
            {ventas.slice(0, 20).map((venta) => (
              <div
                key={venta._id}
                style={{
                  borderBottom: '1px solid #eee',
                  padding: '1rem 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>
                    {venta.prendaNombre}
                  </div>
                  <div style={{ fontSize: '13px', color: '#999' }}>
                    🎨 {venta.color} | {venta.cantidad} × Bs. {Math.round(venta.precio)} | {new Date(venta.fecha).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#667eea' }}>
                  Bs. {Math.round(venta.total)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}