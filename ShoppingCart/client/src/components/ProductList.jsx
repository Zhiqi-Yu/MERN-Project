import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';

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
            <li key={p._id}>
              <strong>{p.name}</strong> — ${Number(p.price).toFixed(2)} | ⭐ {p.rating}
              <div style={{ color:'#555' }}>{p.desc}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
