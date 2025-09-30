// client/src/components/Checkout.jsx
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Checkout() {
  // 购物车与结账信息（从 Redux）
  const { items = [], checkout = {} } = useSelector((s) => s.cart || {});

  // 优惠券（仅前端计算，不入库）
  const coupon = useSelector((s) => s.coupon || { value: null, percent: 0 });
  const couponCodeFromStore = coupon.value || null;
  const couponPercentFromStore = Number(coupon.percent || 0);

  // 本地状态：输入的券码 / 是否已应用 / 错误提示
  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // 用户信息（按作业要求只是本地展示，不写库）
  const [user, setUser] = useState({ name: '', address: '' });

  // “支付完成”页状态（作业第二部分）
  const [paid, setPaid] = useState(false);

  const fmt = (n) => `$${Number(n || 0).toFixed(2)}`;

  // 小计 → 折扣 → 合计（前端即时计算；只有“已应用”后才打折）
  const summary = useMemo(() => {
    const qty = items.reduce((s, i) => s + Number(i.qty || 0), 0);
    const subtotal = items.reduce(
      (s, i) => s + Number(i.qty || 0) * Number(i.price || 0),
      0
    );
    const effectivePercent = couponApplied ? couponPercentFromStore : 0;
    const discount = +(subtotal * (effectivePercent / 100)).toFixed(2);
    const total = +(subtotal - discount).toFixed(2);
    return { qty, subtotal, discount, total, effectivePercent };
  }, [items, couponApplied, couponPercentFromStore]);

  // 点击“应用券码”
  const applyCoupon = () => {
    if (!couponCodeFromStore) {
      setCouponError('No coupon generated yet. Go to Coupon page to generate one.');
      return;
    }
    if (couponInput.trim() !== String(couponCodeFromStore)) {
      setCouponError('Invalid coupon code.');
      return;
    }
    setCouponApplied(true);
    setCouponError('');
  };

  // 支付完成态页面
  if (paid) {
    return (
      <div className="card" style={{ maxWidth: 780, margin: '0 auto' }}>
        <h2>Payment</h2>
        <p>Thank you for the payment, your items under process!</p>
        {!!checkout?.lastOrderId && (
          <p style={{ marginTop: 4 }}>Order #{checkout.lastOrderId}</p>
        )}
        <p style={{ marginTop: 4 }}>
          Paid Total: <strong>{fmt(summary.total)}</strong>
          {summary.effectivePercent > 0 && (
            <span style={{ color: '#666', marginLeft: 8 }}>
              (Coupon{couponCodeFromStore ? ` #${couponCodeFromStore}` : ''},{' '}
              {summary.effectivePercent}% off)
            </span>
          )}
        </p>
        <div style={{ marginTop: 12 }}>
          <Link to="/">← Back to Home</Link>
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

      {/* 用户信息（本地态） */}
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

      {/* 购物车表格 */}
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
              <td colSpan={3} style={{ textAlign: 'right' }}>
                Subtotal
              </td>
              <td style={{ textAlign: 'right' }}>{fmt(summary.subtotal)}</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ textAlign: 'right' }}>
                Discount{' '}
                {summary.effectivePercent > 0
                  ? `(${summary.effectivePercent}%${
                      couponApplied && couponCodeFromStore
                        ? `, code ${couponCodeFromStore}`
                        : ''
                    })`
                  : ''}
              </td>
              <td style={{ textAlign: 'right' }}>
                −{fmt(summary.discount)}
              </td>
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
        <button onClick={() => setPaid(true)}>Proceed to Payment</button>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
}
