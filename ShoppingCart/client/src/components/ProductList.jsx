import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import { addItem } from '../redux/actions/cartActions';
import ReviewsViewer from './ReviewsViewer';
import useStaticHint from '../hooks/useStaticHint';

export default function ProductList() {
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector(s => s.productList);

  const [rvOpen, setRvOpen] = useState(false);
  const [rvProduct, setRvProduct] = useState({ id: null, name: '' });

  useEffect(() => { dispatch(listProducts()); }, [dispatch]);
  // hooks
  useStaticHint('HINT_PRODUCTS', 'Tip: Add products from the product screen', '/');


  const openReviews = (p) => {
    setRvProduct({ id: p._id || p.productId, name: p.name });
    setRvOpen(true);
  };

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

              <button onClick={() => openReviews(p)} style={{ marginLeft: 8 }}>
                View reviews
              </button>

            </li>
          ))}
        </ul>
      )}
      <ReviewsViewer
        open={rvOpen}
        onClose={() => setRvOpen(false)}
        productId={rvProduct.id}
        productName={rvProduct.name}
      />

    </div>
  );
}
