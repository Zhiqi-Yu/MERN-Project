import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, listProducts } from '../redux/actions/productActions';

export default function ProductForm() {
  const nameRef = useRef(); const priceRef = useRef();
  const descRef = useRef(); const ratingRef = useRef();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(s => s.productAdd);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: (nameRef.current.value || '').trim(),
      price: Number(priceRef.current.value),
      desc: (descRef.current.value || '').trim(),
      rating: Number(ratingRef.current.value || 0)
    };
    if (!payload.name || Number.isNaN(payload.price)) return alert('请输入有效 name/price');
    dispatch(addProduct(payload)).then(() => {
      dispatch(listProducts());
      nameRef.current.value = '';
      priceRef.current.value = '';
      descRef.current.value = '';
      ratingRef.current.value = '';
    });
  };

  return (
    <div className='card'>
        <form onSubmit={onSubmit} style={{ display:'grid', gap:8, maxWidth:420 }}>
            <h3>Create Product</h3>
            <label> Name <input ref={nameRef} type="text" /></label>
            <label> Price <input ref={priceRef} type="number" step="0.01" /></label>
            <label> Description <textarea ref={descRef} rows={3} /></label>
            <label> Rating (0-5) <input ref={ratingRef} type="number" min="0" max="5" /></label>
            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Product'}</button>
            {success && <p style={{ color:'green' }}>Saved!</p>}
            {error && <p style={{ color:'crimson' }}>{error}</p>}
        </form>
    </div>
  );
}
