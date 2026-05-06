export default function Dashboard({ data }) {
  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>📊 Dashboard</h2>

      <div className="grid">
        <div className="metric">
          <div className="metric-label">Vendido hoy</div>
          <div className="metric-value">Bs. {Math.round(data.vendidoHoy || 0)}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Prendas vendidas hoy</div>
          <div className="metric-value">{data.prendasHoy || 0}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Total inventario</div>
          <div className="metric-value">{data.totalInventario || 0}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Prenda más vendida</div>
          <div className="metric-value" style={{ fontSize: '16px' }}>
            {data.masPerfecta?.nombre || '-'}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">📈 Total vendido (todos los tiempos)</div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>
          Bs. {Math.round(data.totalVentasAllTime || 0)}
        </div>
      </div>

      <div className="card">
        <div className="card-title">💡 Tips para mejorar tus ventas</div>
        <ul style={{ lineHeight: '1.8', color: '#666' }}>
          <li>📱 Usa TikTok Lives en los horarios pico (mañana y noche)</li>
          <li>👕 Destaca tu prenda estrella: <strong>{data.masPerfecta?.nombre || 'Agrega prendas'}</strong></li>
          <li>📦 Mantén stock de tus prendas más vendidas</li>
          <li>💰 Dedica el 40% de tus ganancias para invertir en más prendas</li>
          <li>📊 Revisa los reportes para ver qué días venden más</li>
        </ul>
      </div>
    </div>
  );
}