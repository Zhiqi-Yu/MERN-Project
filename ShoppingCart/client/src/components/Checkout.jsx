import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { items, checkout } = useSelector(s => s.cart);
  const [user, setUser] = useState({ name: '', address: '' });
  const [paid, setPaid] = useState(false);

  const summary = useMemo(() => ({
    qty: items.reduce((s,i) => s + i.qty, 0),
    total: items.reduce((s,i) => s + i.qty * Number(i.price || 0), 0)
  }), [items]);

  // 支付完成态
  if (paid) {
    return (
      <div className="card">
        <h2>Payment</h2>
        <p>Thank you for the payment, your items under process!</p>
        {checkout?.lastOrderId && <p>Order #{checkout.lastOrderId}</p>}
        <div style={{ marginTop:12 }}>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    );
  }

  // 购物车为空时的兜底
  if (items.length === 0) {
    return (
      <div className="card">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <div style={{ marginTop:12 }}>
          <Link to="/">← Continue shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Checkout</h2>
      <p>We will deliver products to the address below.</p>

      {/* 用户信息 */}
      <div style={{ display:'grid', gap:8, maxWidth:520 }}>
        <label>
          Name
          <input value={user.name}
                 onChange={e=>setUser({ ...user, name: e.target.value })}
                 placeholder="Your full name" />
        </label>
        <label>
          Address
          <textarea rows={3} value={user.address}
                    onChange={e=>setUser({ ...user, address: e.target.value })}
                    placeholder="Street, City, ZIP" />
        </label>
      </div>

      {/* 购物车条目（简单表格；如已有 CartItem 组件也可复用） */}
      <div style={{ marginTop:16 }}>
        <table className="table">
          <thead>
            <tr><th style={{textAlign:'left'}}>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.productId}>
                <td>{i.name}</td>
                <td style={{ textAlign:'center' }}>{i.qty}</td>
                <td style={{ textAlign:'right' }}>${Number(i.price).toFixed(2)}</td>
                <td style={{ textAlign:'right' }}>${(i.qty * i.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}><strong>Summary</strong></td>
              <td style={{ textAlign:'right' }}><strong>{summary.qty}</strong></td>
              <td style={{ textAlign:'right' }}><strong>${summary.total.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 继续支付 */}
      <div style={{ marginTop:12, display:'flex', gap:12 }}>
        <button onClick={() => setPaid(true)}>Proceed to Payment</button>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
}
