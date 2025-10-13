// Payment.jsx
import React, { useEffect, useState } from 'react';   // ← 必须有 React 默认导入
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function Payment() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (e) {
        setErr(e?.response?.data?.message || e.message);
      }
    })();
  }, [id]);

  const fmt = v =>
    Number(v).toLocaleString(undefined, { style: 'currency', currency: 'USD' });

  if (err) return <div className="card">Failed: {err}</div>;
  if (!order) return <div className="card">Loading…</div>;

  return (
    <div className="card" style={{ maxWidth: 780, margin: '0 auto' }}>
      <h2>Payment</h2>
      <p>Thank you for the payment, your items under process!</p>
      
      <p style={{ marginTop: 4 }}>Order #{order.orderId}</p>
      <p style={{ marginTop: 4 }}>
        Paid Total: <strong>{fmt(order.paidTotal ?? order.total)}</strong>
      </p>
      <div style={{ marginTop: 12 }}>
        <Link to="/">← Back to Home</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/orders">View Recent Orders</Link>
      </div>
    </div>
  );
}
