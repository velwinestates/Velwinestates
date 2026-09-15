import React, { useEffect, useState } from 'react';
import { apiUrl } from '../api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('Loading orders...');

  useEffect(() => {
    fetch(apiUrl('/api/orders'), { cache: 'no-store' })
      .then(async response => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Unable to load orders.');
        return data;
      })
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setStatus('');
      })
      .catch(error => setStatus(error.message));
  }, []);

  return (
    <section style={{ fontFamily: 'var(--font-family)' }}>
      <h2 style={{ marginBottom: '0.35rem' }}>Product Orders</h2>
      <p style={{ marginTop: 0, color: '#5d6b63' }}>Orders placed from company product pages.</p>
      {status && <p role="status">{status}</p>}
      {orders.length === 0 && !status ? <p>No product orders yet.</p> : (
        <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid #d6d2c7', borderRadius: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 850 }}>
            <thead>
              <tr>{['Date', 'Company', 'Product', 'Customer', 'Phone', 'Email', 'Address', 'Qty', 'Status'].map(label => <th key={label} style={{ textAlign: 'left', padding: '0.8rem', borderBottom: '1px solid #ddd' }}>{label}</th>)}</tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td style={{ padding: '0.8rem', borderBottom: '1px solid #eee' }}>{new Date(order.createdAt).toLocaleString()}</td>
                  <td style={{ padding: '0.8rem', borderBottom: '1px solid #eee' }}>{order.companyName}</td>
                  <td style={{ padding: '0.8rem', borderBottom: '1px solid #eee' }}>{order.productName}</td>
                  <td style={{ padding: '0.8rem', borderBottom: '1px solid #eee' }}>{order.customerName}</td>
                  <td style={{ padding: '0.8rem', borderBottom: '1px solid #eee' }}>{order.phone}</td>
                  <td style={{ padding: '0.8rem', borderBottom: '1px solid #eee' }}>{order.email}</td>
                  <td style={{ padding: '0.8rem', borderBottom: '1px solid #eee' }}>{order.address}</td>
                  <td style={{ padding: '0.8rem', borderBottom: '1px solid #eee' }}>{order.quantity}</td>
                  <td style={{ padding: '0.8rem', borderBottom: '1px solid #eee', textTransform: 'capitalize' }}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
