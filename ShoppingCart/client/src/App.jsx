import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CouponComponent from './components/CouponComponent';
import UserPage from './components/UserPage';

function ProductFormOrGuard() {
  const { name } = useSelector(s => s.user);
  if (name === 'admin') return <ProductForm />;
  return (
    <div className="card" style={{marginBottom:16}}>
      <h3>Products</h3>
      <p style={{color:'#666'}}>Only <strong>admin</strong> can add new products.</p>
    </div>
  );
}

export default function App() {
  const { isLoggedIn } = useSelector(s => s.user);

  return (
    <div className="page">
      <header className="page-header">
        <Link to="/" className="brand">Shopping Cart — Products</Link>
        {/* 统一放一个导航条；未登录只显示 Home / About / User */}
        <nav style={{display:'flex', gap:12}}>
          <Link to="/">Home</Link>
          {/* <Link to="/about">About</Link> */}
          <Link to="/user">User</Link>
          {/* 登录后才显示 */}
          {isLoggedIn && (
            <>
              <Link to="/checkout">Checkout</Link>
              <Link to="/coupon">Coupon</Link>
            </>
          )}
        </nav>
      </header>

      <main className="page-main">
        <Routes>
          <Route
            path="/"
            element={<><ProductFormOrGuard/><ProductList/><Cart/></>}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/coupon" element={<CouponComponent />} />
          <Route path="/about" element={<div className="card"><h2>About</h2></div>} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </main>
    </div>
  );
}
