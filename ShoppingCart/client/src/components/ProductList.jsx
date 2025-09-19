import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import { addItem } from '../redux/actions/cartActions';

export default function ProductList() {
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector(s => s.productList);

  useEffect(() => { dispatch(listProducts()); }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{ color:'crimson' }}>{error}</p>;

  return (
    <div className='products'>
      <h3>Products</h3>
      {items.length === 0 ? <p>No products.</p> : (
        <ul>
          {items.map(p => (
            <li key={p._id} className="card">
              <strong>{p.name}</strong> — ${Number(p.price).toFixed(2)} | ⭐ {p.rating} | {p.category}
              <div style={{ color:'#666' }}>{p.desc}</div>
              <button onClick={() => dispatch(addItem({
                productId: p._id,
                name: p.name,
                price: p.price,
                qty: 1,
                category: p.category || ''
              }))}>Add To Cart</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
