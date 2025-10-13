// client/src/components/ReviewModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function ReviewModal({
  show,
  onClose,
  orderId,
  product = null,         // { productId, name } 或 null => 订单级
  userId,
  onSubmitted,
}) {
  if (!show) return null;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const submit = async () => {
    try {
      await axios.post('/api/reviews', {
        orderId,
        productId: product?.productId || null,
        rating: Number(rating),
        comment,
        userId,
      });
      onSubmitted?.();
      onClose();
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div style={backdropStyle}>
      <div style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>
          {product ? `Review — ${product.name}` : 'Review Order'}
        </h3>

        <div style={{ marginTop: 8 }}>
          <label>Rating:&nbsp;</label>
          <select value={rating} onChange={e => setRating(e.target.value)}>
            {[5,4,3,2,1].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div style={{ marginTop: 8 }}>
          <textarea
            rows={4}
            placeholder="Your comments"
            style={{ width: '100%' }}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button onClick={onClose} style={{ marginRight: 8 }}>Cancel</button>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

// 简易样式
const backdropStyle = {
  position:'fixed', inset:0, background:'rgba(0,0,0,0.35)',
  display:'flex', alignItems:'center', justifyContent:'center', zIndex: 999
};
const cardStyle = {
  width: 520, background:'#fff', borderRadius: 8, padding:16, boxShadow:'0 12px 30px rgba(0,0,0,0.2)'
};
