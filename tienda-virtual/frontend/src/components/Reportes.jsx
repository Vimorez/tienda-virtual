export default function Reportes({ ventas, prendas }) {
  const ventasPorDia = {};
  ventas.forEach((venta) => {
    const fecha = new Date(venta.fecha).toLocaleDateString('es-ES');
    ventasPorDia[fecha] = (ventasPorDia[fecha] || 0) + venta.total;
  });

  const diasOrdenados = Object.entries(ventasPorDia)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
    .slice(0, 30);

  const prendasMasVendidas = [...prendas]
    .filter((p) => p.vendidas > 0)
    .sort((a, b) => b.vendidas - a.vendidas);

  const bajoStock = prendas.filter((p) => p.cantidad <= 3);

  const ventasPorDiaSemana = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const diasNombre = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  ventas.forEach((venta) => {
    const dia = new Date(venta.fecha).getDay();
    ventasPorDiaSemana[dia] += venta.total;
  });

  const mejorDia = Object.entries(ventasPorDiaSemana).reduce((max, [dia, total]) =>
    total > max[1] ? [dia, total] : max,
    [-1, 0]
  );

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>📋 Reportes y Análisis</h2>

      <div className="card">
        <div className="card-title">📊 Resumen de desempeño</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{
            padding: '1rem',
            background: '#f0f9ff',
            borderRadius: '8px',
            borderLeft: '4px solid #0284c7'
          }}>
            <div style={{ fontSize: '13px', color: '#0c4a6e' }}>Total de ventas</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '0.5rem', color: '#0284c7' }}>
              {ventas.length} transacciones
            </div>
          </div>
          <div style={{
            padding: '1rem',
            background: '#fef3c7',
            borderRadius: '8px',
            borderLeft: '4px solid #ca8a04'
          }}>
            <div style={{ fontSize: '13px', color: '#92400e' }}>Mejor día para vender</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '0.5rem', color: '#ca8a04' }}>
              {mejorDia[0] !== -1 ? diasNombre[mejorDia[0]] : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">📈 Ventas de los últimos 30 días</div>
        {diasOrdenados.length === 0 ? (
          <p style={{ color: '#999' }}>Sin datos de ventas</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            {diasOrdenados.map(([fecha, total]) => (
              <div
                key={fecha}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}
              >
                <span>{fecha}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: Math.max(10, (total / Math.max(...Object.values(ventasPorDia))) * 200),
                    height: '20px',
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '4px'
                  }} />
                  <strong style={{ minWidth: '80px' }}>
                    Bs. {Math.round(total)}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">🏆 Top 5 prendas más vendidas</div>
        {prendasMasVendidas.length === 0 ? (
          <p style={{ color: '#999' }}>Sin ventas aún</p>
        ) : (
          <div>
            {prendasMasVendidas.slice(0, 5).map((prenda, index) => (
              <div
                key={prenda._id}
                style={{
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  background: '#f9fafb',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>
                    #{index + 1} {prenda.nombre}
                  </div>
                  <div style={{ fontSize: '13px', color: '#999' }}>
                    Bs. {Math.round(prenda.precio)} c/u
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                    {prenda.vendidas}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999' }}>vendidas</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">⚠️ Prendas con bajo stock (≤3 unidades)</div>
        {bajoStock.length === 0 ? (
          <p style={{ color: '#10b981', fontWeight: '600' }}>✅ Todas tus prendas tienen buen stock</p>
        ) : (
          <div>
            {bajoStock.map((prenda) => (
              <div
                key={prenda._id}
                style={{
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  background: '#fef2f2',
                  borderRadius: '8px',
                  borderLeft: '4px solid #dc2626'
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  ⚠️ {prenda.nombre}
                </div>
                <div style={{ fontSize: '13px', color: '#991b1b' }}>
                  Solo {prenda.cantidad} unidades disponibles - ¡Necesitas reabastecerte!
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}