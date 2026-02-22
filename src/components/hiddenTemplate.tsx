{/* Hidden Invoice Template - Render this at the bottom of your OrdersPage */}
<div id={`invoice-${order.id}`} style={{ display: 'none', width: '800px', padding: '40px', backgroundColor: 'white', color: 'black' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>COFFEE CORP B2B</h1>
      <p>123 Roaster Way, Seattle, WA</p>
    </div>
    <div style={{ textAlign: 'right' }}>
      <h2 style={{ fontSize: '18px' }}>INVOICE</h2>
      <p>Order ID: #{order.id}</p>
      <p>Date: {new Date().toLocaleDateString()}</p>
    </div>
  </div>

  <div style={{ marginBottom: '40px' }}>
    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Bill To:</h3>
    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{order.clientName}</p>
  </div>

  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr style={{ backgroundColor: '#f8f9fa' }}>
        <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
        <th style={{ padding: '10px', textAlign: 'right' }}>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Wholesale Coffee Supply Bundle</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'right' }}>${order.amount.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  <div style={{ marginTop: '40px', textAlign: 'right' }}>
    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Total: ${order.amount.toFixed(2)}</p>
  </div>
</div>