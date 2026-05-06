import { useState } from 'react';
import api from '../api';

export default function Inventario({ prendas, onRecargar }) {
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    foto: null,
    colores: []
  });
  const [colorInput, setColorInput] = useState({ nombre: '', cantidad: '' });
  const [previewFoto, setPreviewFoto] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [editando, setEditando] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const comprimirImagen = (imagenBase64) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imagenBase64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > 600) {
          height = (height * 600) / width;
          width = 600;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const imagenComprimida = canvas.toDataURL('image/jpeg', 0.6);
        resolve(imagenComprimida);
      };
    });
  };

  const handleFotoChange = async (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      if (!archivo.type.startsWith('image/')) {
        setMensaje({ tipo: 'error', texto: '❌ Por favor sube una imagen (JPG, PNG, etc)' });
        return;
      }

      if (archivo.size > 10 * 1024 * 1024) {
        setMensaje({ tipo: 'error', texto: '❌ La imagen es muy grande (máximo 10MB)' });
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const imagenComprimida = await comprimirImagen(event.target.result);
        setForm({ ...form, foto: imagenComprimida });
        setPreviewFoto(imagenComprimida);
      };
      reader.readAsDataURL(archivo);
    }
  };

  // Agregar color - CON VALIDACIÓN DE DUPLICADOS
  const agregarColor = () => {
    if (!colorInput.nombre || !colorInput.cantidad) {
      setMensaje({ tipo: 'error', texto: '❌ Completa nombre y cantidad del color' });
      return;
    }

    // VERIFICAR SI EL COLOR YA EXISTE
    const colorExistente = form.colores.find(
      c => c.nombre.toLowerCase() === colorInput.nombre.toLowerCase()
    );

    if (colorExistente) {
      setMensaje({ tipo: 'error', texto: `❌ El color "${colorInput.nombre}" ya existe. Puedes editar su cantidad.` });
      return;
    }

    const nuevoColor = {
      nombre: colorInput.nombre,
      cantidad: parseInt(colorInput.cantidad)
    };

    setForm({
      ...form,
      colores: [...form.colores, nuevoColor]
    });

    setColorInput({ nombre: '', cantidad: '' });
    setMensaje({ tipo: 'success', texto: `✅ Color "${nuevoColor.nombre}" agregado` });
    setTimeout(() => setMensaje(''), 2000);
  };

  // Editar cantidad de un color
  const editarColorCantidad = (index, nuevaCantidad) => {
    const coloresActualizados = [...form.colores];
    coloresActualizados[index].cantidad = parseInt(nuevaCantidad) || 0;
    setForm({
      ...form,
      colores: coloresActualizados
    });
  };

  // Eliminar color
  const eliminarColor = (index) => {
    const colorEliminado = form.colores[index].nombre;
    setForm({
      ...form,
      colores: form.colores.filter((_, i) => i !== index)
    });
    setMensaje({ tipo: 'success', texto: `✅ Color "${colorEliminado}" eliminado` });
    setTimeout(() => setMensaje(''), 2000);
  };

  const agregarPrenda = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    if (form.colores.length === 0) {
      setMensaje({ tipo: 'error', texto: '❌ Debes agregar al menos un color' });
      setCargando(false);
      return;
    }

    try {
      if (editando) {
        await api.put(`/prendas/${editando._id}`, {
          nombre: form.nombre,
          precio: parseFloat(form.precio),
          descripcion: form.descripcion,
          foto: form.foto,
          colores: form.colores
        });
        setMensaje({ tipo: 'success', texto: '✅ Prenda actualizada correctamente' });
        setEditando(null);
      } else {
        await api.post('/prendas', {
          nombre: form.nombre,
          precio: parseFloat(form.precio),
          descripcion: form.descripcion,
          foto: form.foto,
          colores: form.colores
        });
        setMensaje({ tipo: 'success', texto: '✅ Prenda agregada correctamente' });
      }

      setForm({
        nombre: '',
        precio: '',
        descripcion: '',
        foto: null,
        colores: []
      });
      setColorInput({ nombre: '', cantidad: '' });
      setPreviewFoto(null);
      onRecargar();

      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: `❌ ${error.response?.data?.error || 'Error al guardar prenda'}` });
    } finally {
      setCargando(false);
    }
  };

  const iniciarEdicion = (prenda) => {
    setEditando(prenda);
    setForm({
      nombre: prenda.nombre,
      precio: prenda.precio,
      descripcion: prenda.descripcion || '',
      foto: prenda.foto,
      colores: prenda.colores && prenda.colores.length > 0 ? prenda.colores : []
    });
    setColorInput({ nombre: '', cantidad: '' });
    setPreviewFoto(prenda.foto);
    window.scrollTo(0, 0);
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setForm({
      nombre: '',
      precio: '',
      descripcion: '',
      foto: null,
      colores: []
    });
    setColorInput({ nombre: '', cantidad: '' });
    setPreviewFoto(null);
  };

  const eliminarPrenda = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta prenda?')) return;

    try {
      await api.delete(`/prendas/${id}`);
      onRecargar();
      setMensaje({ tipo: 'success', texto: '✅ Prenda eliminada' });
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: '❌ Error al eliminar prenda' });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>👕 Mi Inventario</h2>

      {mensaje && (
        <div className={mensaje.tipo === 'success' ? 'success' : 'error'}>
          {mensaje.texto}
        </div>
      )}

      <div className="card">
        <div className="card-title">
          {editando ? '✏️ Editar prenda' : '➕ Agregar nueva prenda'}
        </div>

        <form onSubmit={agregarPrenda}>
          <div className="row">
            <div className="form-group">
              <label className="form-label">Nombre de la prenda</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Camiseta"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Precio (Bs.)</label>
              <input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                placeholder="Ej: 150"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Talla, material, detalles..."
              style={{ height: '60px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">📸 Foto de la prenda</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              style={{ padding: '8px' }}
            />
            
            {previewFoto && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '0.5rem' }}>Vista previa:</p>
                <img
                  src={previewFoto}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '150px',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
            )}
          </div>

          {/* SECCIÓN DE COLORES */}
          <div style={{ background: '#f0f4ff', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>🎨 Colores disponibles</h4>

            <div className="row">
              <div className="form-group">
                <label className="form-label">Nombre del color</label>
                <input
                  type="text"
                  value={colorInput.nombre}
                  onChange={(e) => setColorInput({ ...colorInput, nombre: e.target.value })}
                  placeholder="Ej: Negro, Blanco, Rojo..."
                />
              </div>
              <div className="form-group">
                <label className="form-label">Cantidad en stock</label>
                <input
                  type="number"
                  value={colorInput.cantidad}
                  onChange={(e) => setColorInput({ ...colorInput, cantidad: e.target.value })}
                  placeholder="Ej: 5"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={agregarColor}
              style={{ width: '100%', background: '#667eea' }}
            >
              + Agregar color
            </button>

            {form.colores && form.colores.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <h5 style={{ marginBottom: '0.5rem' }}>Colores agregados ({form.colores.length}):</h5>
                {form.colores.map((color, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px',
                      background: 'white',
                      borderRadius: '6px',
                      marginBottom: '8px',
                      border: '1px solid #ddd'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', marginBottom: '4px' }}>{color.nombre}</strong>
                      <input
                        type="number"
                        value={color.cantidad}
                        onChange={(e) => editarColorCantidad(index, e.target.value)}
                        style={{ width: '80px', padding: '4px' }}
                        min="0"
                      />
                      <span style={{ marginLeft: '8px', fontSize: '12px', color: '#999' }}>unidades</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => eliminarColor(index)}
                      className="btn-danger"
                      style={{ fontSize: '12px', padding: '6px 12px' }}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={cargando} style={{ flex: 1 }}>
              {cargando ? 'Guardando...' : editando ? '✏️ Actualizar prenda' : '✅ Agregar prenda'}
            </button>
            {editando && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                ❌ Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <div className="card-title">📦 Prendas en inventario ({prendas.length})</div>

        {prendas.length === 0 ? (
          <p style={{ color: '#999' }}>No hay prendas agregadas aún</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {prendas.map((prenda) => {
              // Asegurar que colores existe y es un array
              const colores = prenda.colores && Array.isArray(prenda.colores) ? prenda.colores : [];
              const totalStock = colores.reduce((sum, c) => sum + (c.cantidad || 0), 0);

              return (
                <div
                  key={prenda._id}
                  style={{
                    border: editando?._id === prenda._id ? '2px solid #667eea' : '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '1rem',
                    background: editando?._id === prenda._id ? '#f0f4ff' : 'white'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '150px',
                    background: '#f0f0f0',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {prenda.foto ? (
                      <img
                        src={prenda.foto}
                        alt={prenda.nombre}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <p style={{ color: '#999' }}>Sin foto</p>
                    )}
                  </div>

                  <h4 style={{ marginBottom: '0.5rem' }}>{prenda.nombre}</h4>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                    Bs. {Math.round(prenda.precio)}
                  </p>

                  {/* Mostrar colores y stock */}
                  {colores.length > 0 ? (
                    <div style={{ marginBottom: '1rem', fontSize: '13px' }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Colores:</p>
                      {colores.map((color, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>{color.nombre}:</span>
                          <span style={{ fontWeight: 'bold' }}>
                            {color.cantidad > 0 ? (
                              <span style={{ color: '#10b981' }}>✅ {color.cantidad}</span>
                            ) : (
                              <span style={{ color: '#ef4444' }}>❌ Agotado</span>
                            )}
                          </span>
                        </div>
                      ))}
                      <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #ddd', fontWeight: 'bold' }}>
                        Total: {totalStock}
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontSize: '13px', color: '#999', marginBottom: '1rem' }}>
                      Sin colores definidos
                    </p>
                  )}

                  {prenda.vendidas > 0 && (
                    <p style={{ fontSize: '13px', color: '#667eea', marginBottom: '1rem' }}>
                      ⭐ {prenda.vendidas} vendidas
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => iniciarEdicion(prenda)}
                      style={{ flex: 1, fontSize: '12px', background: '#667eea' }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => eliminarPrenda(prenda._id)}
                      className="btn-danger"
                      style={{ flex: 1, fontSize: '12px' }}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}