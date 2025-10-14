import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { emptyCart } from '../redux/actions/cartActions';
import useStaticHint from '../hooks/useStaticHint';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 购物车、用户、优惠券（都来自 Redux）
  const { items = [], checkout = {} } = useSelector((s) => s.cart || {});
  const { name: userName } = useSelector((s) => s.user || { name: '' });
  const coupon = useSelector((s) => s.coupon || { value: null, percent: 0 });

  // 券码相关本地态
  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // 用户收货信息（作业第二部分只做展示，不落库）
  const [user, setUser] = useState({ name: '', address: '' });

  // 支付完成态
  const [paid, setPaid] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const fmt = (n) => `$${Number(n || 0).toFixed(2)}`;

  // 计算价格（只有已应用券码才打折；折扣仅前端计算）
  const summary = useMemo(() => {
    const qty = items.reduce((s, i) => s + Number(i.qty || 0), 0);
    const subtotal = items.reduce(
      (s, i) => s + Number(i.qty || 0) * Number(i.price || 0),
      0
    );
    const effectivePercent = couponApplied ? Number(coupon.percent || 0) : 0;
    const discount = +(subtotal * (effectivePercent / 100)).toFixed(2);
    const total = +(subtotal - discount).toFixed(2);
    return { qty, subtotal, discount, total, effectivePercent };
  }, [items, couponApplied, coupon.percent]);

  // 把优惠券带给后端
  const { value: couponCode = null, percent: couponPercent = 0 } =
  useSelector(s => s.coupon || {});

  // hooks
  useStaticHint('HINT_CHECKOUT', 'Tip: Review your cart in Checkout', '/checkout');

  const applyCoupon = () => {
    if (!coupon.value) {
      setCouponError('No coupon generated yet. Go to Coupon page to generate one.');
      return;
    }
    if (couponInput.trim() !== String(coupon.value)) {
      setCouponError('Invalid coupon code.');
      return;
    }
    setCouponApplied(true);
    setCouponError('');
  };

  // 点击“支付”：调用 /api/orders 写入订单 → 清空购物车 → 切到完成页
  const handlePayment = async () => {
    try {
      const body = {
        userId: userName || 'guest',
        items: items.map((i) => ({
          productId: i.productId || i.product || undefined,
          name: i.name,
          price: i.price,
          qty: i.qty,
          category: i.category || '',
        })),
        // total: summary.total, // 后端仍会重算
        couponCode,
        couponPercent,
      };
      const { data } = await axios.post('/api/orders', body);
      // setOrderId(data?.orderId || null);
      // setPaid(true);

      dispatch(emptyCart());
      navigate(`/payment/${data.orderId}`); // 跳去独立成功页
      
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Payment failed');
    }
  };

  // 支付完成页
  if (paid) {
    return (
      <div className="card" style={{ maxWidth: 780, margin: '0 auto' }}>
        <h2>Payment</h2>
        <p>Thank you for the payment, your items under process!</p>
        {orderId && <p style={{ marginTop: 4 }}>Order #{orderId}</p>}
        <p style={{ marginTop: 4 }}>
          Paid Total: <strong>{fmt(summary.total)}</strong>
          {couponApplied && coupon.value && (
            <span style={{ color: '#666', marginLeft: 8 }}>
              (Coupon #{coupon.value}, {summary.effectivePercent}% off)
            </span>
          )}
        </p>
        <div style={{ marginTop: 12 }}>
          <Link to="/">← Back to Home</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to="/orders">View Recent Orders</Link>
        </div>
      </div>
    );
  }

  // 购物车为空兜底
  if (!items.length) {
    return (
      <div className="card" style={{ maxWidth: 780, margin: '0 auto' }}>
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <div style={{ marginTop: 12 }}>
          <Link to="/">← Continue shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: 780, margin: '0 auto' }}>
      <h2>Checkout</h2>
      <p>We will deliver products to the address below.</p>

      {/* 用户信息（仅本地显示） */}
      <div style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
        <label>
          Name
          <input
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Your full name"
          />
        </label>
        <label>
          Address
          <textarea
            rows={3}
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            placeholder="Street, City, ZIP"
          />
        </label>
      </div>

      {/* 清单表格 */}
      <div style={{ marginTop: 16 }}>
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Item</th>
              <th style={{ width: 80, textAlign: 'center' }}>Qty</th>
              <th style={{ width: 120, textAlign: 'right' }}>Price</th>
              <th style={{ width: 140, textAlign: 'right' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, idx) => (
              <tr key={i.productId || i._id || i.name + idx}>
                <td>{i.name}</td>
                <td style={{ textAlign: 'center' }}>{i.qty}</td>
                <td style={{ textAlign: 'right' }}>{fmt(i.price)}</td>
                <td style={{ textAlign: 'right' }}>
                  {fmt(Number(i.price) * Number(i.qty))}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ textAlign: 'right' }}>Subtotal</td>
              <td style={{ textAlign: 'right' }}>{fmt(summary.subtotal)}</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ textAlign: 'right' }}>
                Discount{' '}
                {summary.effectivePercent > 0
                  ? `(${summary.effectivePercent}%${
                      couponApplied && coupon.value ? `, code ${coupon.value}` : ''
                    })`
                  : ''}
              </td>
              <td style={{ textAlign: 'right' }}>−{fmt(summary.discount)}</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ textAlign: 'right' }}>
                <strong>Total</strong>
              </td>
              <td style={{ textAlign: 'right' }}>
                <strong>{fmt(summary.total)}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 券码输入与应用 */}
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <input
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          placeholder="Enter coupon code"
          style={{ width: 220 }}
        />
        <button onClick={applyCoupon} disabled={!couponInput}>
          Apply
        </button>
        {couponApplied && (
          <span style={{ color: '#0a0' }}>
            Applied {summary.effectivePercent}% off
          </span>
        )}
        {!!couponError && <span style={{ color: 'crimson' }}>{couponError}</span>}
      </div>

      {/* 操作按钮 */}
      <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
        <button onClick={handlePayment}>Proceed to Payment</button>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
}
