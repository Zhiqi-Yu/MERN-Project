import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';  


export default () => (
  <div className="page">
      <header className="page-header">
        <Link to="/" className="brand">Shopping Cart — Products</Link>
        <nav><Link to="/checkout">Checkout</Link></nav>
      </header>

      <main className="page-main">
        <Routes>
          <Route path="/" element={
            <>
              <ProductForm />
              <ProductList />
              <Cart />
            </>
          } />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </div>
);
