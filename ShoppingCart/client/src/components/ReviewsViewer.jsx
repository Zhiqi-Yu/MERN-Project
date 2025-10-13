// client/src/components/ReviewsViewer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReviewsViewer({ open, onClose, productId, productName }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!open || !productId) return;
    setLoading(true); setErr('');
    axios.get(`/api/reviews/product/${productId}`)
      .then(({ data }) => setList(Array.isArray(data) ? data : []))
      .catch(e => setErr(e?.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  }, [open, productId]);

  if (!open) return null;

  const avg = list.length
    ? (list.reduce((s, r) => s + Number(r.rating || 0), 0) / list.length).toFixed(2)
    : '—';

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={cardStyle} onClick={e => e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ margin:0 }}>Reviews — {productName}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <p style={{ marginTop:8 }}>
          Average: <strong>{avg}</strong> {avg !== '—' ? '★' : ''} &nbsp;|&nbsp;
          Count: <strong>{list.length}</strong>
        </p>

        {loading && <p>Loading…</p>}
        {err && <p style={{ color:'crimson' }}>{err}</p>}
        {!loading && !err && list.length === 0 && <p>No reviews yet.</p>}

        <ul style={{ marginTop: 8, maxHeight: 320, overflow: 'auto', paddingLeft: 16 }}>
          {list.map(r => (
            <li key={r._id} style={{ marginBottom: 8 }}>
              <div><strong>{'★'.repeat(r.rating)}</strong> — {r.userId}</div>
              {r.comment && <div style={{ color:'#444' }}>{r.comment}</div>}
              <div style={{ color:'#888', fontSize:12 }}>
                {new Date(r.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const backdropStyle = {
  position:'fixed', inset:0, background:'rgba(0,0,0,0.35)',
  display:'flex', alignItems:'center', justifyContent:'center', zIndex: 999
};
const cardStyle = {
  width: 560, background:'#fff', borderRadius: 10, padding:16,
  boxShadow:'0 16px 36px rgba(0,0,0,0.25)'
};
