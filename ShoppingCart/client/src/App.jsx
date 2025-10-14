import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 页面组件
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CouponComponent from './components/CouponComponent';
import RecentOrders from './components/RecentOrders';
import UserPage from './components/UserPage';
import Payment from './components/Payment';
import NotificationBell from './components/NotificationBell';
import useCartCountNotice from './hooks/useCartCountNotice';



export default function App() {
  useCartCountNotice();
  const { isLoggedIn, name } = useSelector((s) => s.user || {});

  const AdminOnlyBox = () => (
    <div className="card" style={{ marginBottom: 12 }}>
      <h3 style={{ marginTop: 0 }}>Product Admin</h3>
      {name === 'admin' ? (
        <ProductForm />
      ) : (
        <div style={{ color: '#666' }}>
          Only <strong>admin</strong> can add products.
        </div>
      )}
    </div>
  );

  return (
    <div className="page">
      <header className="page-header">
        <Link to="/" className="brand">Shopping Cart — Products</Link>
        <nav style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginLeft:16 }}> 
          {/* 未登录只显示 Home / User */}
          <Link to="/">Home</Link>
          <Link to="/user">User</Link>

          {/* 登录后显示以下入口（Part B） */}
          {isLoggedIn && <Link to="/checkout">Checkout</Link>}
          {isLoggedIn && <Link to="/coupon">Coupon</Link>}
          {isLoggedIn && <Link to="/orders">Orders</Link>}
        </nav>

        {/* 右上角铃铛🔔 */}
        <div style={{ marginLeft:'auto' }}>
          <NotificationBell />
        </div>
      </header>

      <main className="page-main">
        <Routes>
          {/* 首页：商品列表 + 购物车；admin 还能看到新增商品表单 */}
          <Route
            path="/"
            element={
              <>
                <AdminOnlyBox />
                <ProductList />
                <Cart />
              </>
            }
          />

          {/* 结账页 */}
          <Route path="/checkout" element={<Checkout />} />

          {/* 生成/查看优惠券 */}
          <Route path="/coupon" element={<CouponComponent />} />

          {/* 我的订单（Recent Orders） */}
          <Route path="/orders" element={<RecentOrders />} />

          {/* 用户登录页 */}
          <Route path="/user" element={<UserPage />} />

          {/* 支付页面 */}
          <Route path="/payment/:id" element={<Payment />} />

          {/* 兜底：回首页 */}
          <Route path="*" element={<div className="card">Not Found. <Link to="/">Go Home</Link></div>} />
        </Routes>
      </main>
    </div>
  );
}
