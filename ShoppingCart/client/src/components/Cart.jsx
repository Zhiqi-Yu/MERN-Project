// components/Cart.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateItem, checkoutCart } from '../redux/actions/cartActions';

export default function Cart(){
  const dispatch = useDispatch();
  const { items, checkout } = useSelector(s => s.cart);
  const total = items.reduce((s,i)=> s + i.price * i.qty, 0);

  return (
    <div className="card" style={{ marginTop:16 }}>
      <h3>Cart</h3>
      {items.length===0 ? <p>Empty.</p> : (
        <ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:8}}>
          {items.map(i => (
            <li key={i.productId} style={{display:'grid',gridTemplateColumns:'1fr auto auto auto',gap:8,alignItems:'center'}}>
              <div><strong>{i.name}</strong> — ${i.price} × </div>
              <input type="number" min="1" value={i.qty}
                     onChange={e=>dispatch(updateItem(i.productId, Number(e.target.value)||1))}
                     style={{width:70}}/>
              <div>${(i.price*i.qty).toFixed(2)}</div>
              <button onClick={()=>dispatch(removeItem(i.productId))}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div style={{marginTop:12,fontWeight:700}}>Total: ${total.toFixed(2)}</div>
      <button disabled={checkout.loading || items.length===0}
              onClick={()=>dispatch(checkoutCart())}
              style={{marginTop:12}}>
        {checkout.loading ? 'Saving...' : 'Save to Checkout'}
      </button>
      {checkout.success && (
        <p className="notice-success">
            {checkout.message} {checkout.lastOrderId ? `(Order #${checkout.lastOrderId})` : ''}
        </p>
        )}
      {checkout.error && <p className="notice-error">{checkout.error}</p>}
    </div>
  );
}
