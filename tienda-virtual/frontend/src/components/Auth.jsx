import { useState } from 'react';
import api from '../api';
import './Auth.css';

export default function Auth({ onAuth }) {
  const [modo, setModo] = useState('login');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    negocioNombre: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const endpoint = modo === 'login' ? '/auth/login' : '/auth/registro';
      const response = await api.post(endpoint, form);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      
      onAuth(response.data.usuario);
    } catch (err) {
      setError(err.response?.data?.error || 'Error en la solicitud');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🛍️ Mi Tienda Virtual</h1>
        <h2>{modo === 'login' ? 'Inicia sesión' : 'Crea tu cuenta'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {modo === 'registro' && (
            <>
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="negocioNombre"
                placeholder="Nombre de tu tienda (ej: Mi Tienda de Ropa)"
                value={form.negocioNombre}
                onChange={handleChange}
              />
            </>
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={cargando}>
            {cargando ? 'Cargando...' : modo === 'login' ? 'Inicia sesión' : 'Crear cuenta'}
          </button>
        </form>

        <p className="toggle-mode">
          {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} {' '}
          <button
            type="button"
            onClick={() => setModo(modo === 'login' ? 'registro' : 'login')}
            className="link-button"
          >
            {modo === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}
