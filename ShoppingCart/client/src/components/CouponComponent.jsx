// client/src/components/CouponComponent.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// 注意文件名：你项目里是 couponAction.js（不是 couponActions.js）
import { generateCoupon } from '../redux/actions/couponActions';

export default function CouponComponent() {
  const dispatch = useDispatch();

  // 给默认对象，避免 s.coupon 为空时报错
  const { value: code = null, percent = 0 } = useSelector(s => s.coupon || {});

  return (
    <div className="card" style={{ maxWidth: 520 }}>
      <h2>Coupon</h2>
      <p>Click to generate a 6-digit coupon. We also attach a % off.</p>

      <div style={{ display:'flex', gap:8 }}>
        {/* 随机折扣 */}
        <button onClick={() => dispatch(generateCoupon('random'))}>Generate Coupon</button>
        {/* 固定折扣（可选） */}
        <button onClick={() => dispatch(generateCoupon('fixed'))}>Generate 20% Off</button>
      </div>

      {code && (
        <p style={{ marginTop: 10 }}>
          Coupon: <strong>{code}</strong> — <strong>{percent}% off</strong>
        </p>
      )}
    </div>
  );
}
