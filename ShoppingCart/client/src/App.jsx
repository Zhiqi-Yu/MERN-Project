import React from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
export default () => (
  <div>
    <h2>Shopping Cart — Products</h2>
    <ProductForm />
    <ProductList />
    <Cart />
  </div>
);
