export default function Finanzas({ ventas, prendas }) {
  const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);
  const ganancia = totalVentas * 0.6;
  const inversion = totalVentas * 0.4;
  const costoInventario = prendas.reduce((sum, p) => sum + (p.cantidad * p.precio * 0.3), 0);

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>💵 Finanzas</h2>

      <div className="grid">
        <div className="metric">
          <div className="metric-label">Total vendido</div>
          <div className="metric-value">Bs. {Math.round(totalVentas)}</div>
        </div>
        <div className="metric" style={{ background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)' }}>
          <div className="metric-label">Tu ganancia (60%)</div>
          <div className="metric-value">Bs. {Math.round(ganancia)}</div>
        </div>
        <div className="metric" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }}>
          <div className="metric-label">Para invertir (40%)</div>
          <div className="metric-value">Bs. {Math.round(inversion)}</div>
        </div>
        <div className="metric" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' }}>
          <div className="metric-label">Costo inventario</div>
          <div className="metric-value">Bs. {Math.round(costoInventario)}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">📊 Desglose financiero</div>

        <div style={{ 
          marginBottom: '1rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '13px', opacity: 0.9 }}>DINERO QUE ENTRA (100%)</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '0.5rem' }}>
            Bs. {Math.round(totalVentas)}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{
            padding: '1.5rem',
            background: '#ecfdf5',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981'
          }}>
            <div style={{ fontSize: '13px', color: '#047857' }}>TU GANANCIA (60%)</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '0.5rem', color: '#10b981' }}>
              Bs. {Math.round(ganancia)}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '0.5rem' }}>
              Es tuya para vivir, ahorrar o lo que quieras
            </div>
          </div>

          <div style={{
            padding: '1.5rem',
            background: '#fffbeb',
            borderRadius: '8px',
            borderLeft: '4px solid #f59e0b'
          }}>
            <div style={{ fontSize: '13px', color: '#92400e' }}>PARA INVERTIR (40%)</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '0.5rem', color: '#f59e0b' }}>
              Bs. {Math.round(inversion)}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '0.5rem' }}>
              Para comprar más prendas y crecer tu negocio
            </div>
          </div>
        </div>

        <div style={{
          padding: '1rem',
          background: '#f3f4f6',
          borderRadius: '8px',
          borderLeft: '4px solid #6b7280'
        }}>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>COSTO ESTIMADO DEL INVENTARIO</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '0.5rem', color: '#374151' }}>
            Bs. {Math.round(costoInventario)}
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '0.5rem' }}>
            Cálculo aproximado (30% del valor de venta)
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">💡 Cómo funciona tu financiero</div>
        <div style={{ lineHeight: '1.8', color: '#666' }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>60% Tu ganancia:</strong><br />
            Es el dinero que ganas realmente. Lo usas para vivir, pagar gastos, ahorrar o lo que necesites.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>40% Para reinvertir:</strong><br />
            Este dinero lo guardas para comprar más prendas, ampliar tu inventario y hacer crecer tu negocio.
          </p>
          <p>
            <strong>💡 Consejo:</strong> Mientras más inviertas en prendas, más podrás vender y tus ganancias crecerán exponencialmente. ¡Es un círculo virtuoso!
          </p>
        </div>
      </div>
    </div>
  );
}