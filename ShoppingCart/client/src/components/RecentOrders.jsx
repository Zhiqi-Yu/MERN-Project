import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders, cancelOrder } from '../redux/actions/orderActions';
import { addItem, emptyCart } from '../redux/actions/cartActions';

/** =============== 轻量 Review 弹窗（内置） =============== */
function ReviewModal({ show, onClose, orderId, product, userId, onSubmitted }) {
  if (!show) return null;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const submit = async () => {
    try {
      await axios.post('/api/reviews', {
        orderId,
        productId: product?.productId || null, // null => 订单级评价
        rating: Number(rating),
        comment,
        userId,
      });
      onSubmitted?.(); // 让父组件刷新“已评集合”
      onClose();
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div style={backdropStyle}>
      <div style={cardStyle}>
        <h3 style={{ margin: 0 }}>{product ? `Review — ${product.name}` : 'Review Order'}</h3>
        <div style={{ marginTop: 8 }}>
          <label>Rating:&nbsp;</label>
          <select value={rating} onChange={e => setRating(e.target.value)}>
            {[5,4,3,2,1].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div style={{ marginTop: 8 }}>
          <textarea
            rows={4}
            placeholder="Your comments"
            style={{ width: '100%' }}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button onClick={onClose} style={{ marginRight: 8 }}>Cancel</button>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
const backdropStyle = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
};
const cardStyle = {
  width: 520, background: '#fff', borderRadius: 8, padding: 16,
  boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
};

/** ===================== 主组件 ===================== */
export default function RecentOrders() {
  const dispatch = useDispatch();
  const { name: userName } = useSelector(s => s.user || { name: '' });
  const { loading, error, items: orders } = useSelector(s => s.orders);

  // 展开/收起
  const [open, setOpen] = useState({}); // {orderId: bool}
  const toggle = (id) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  // 我已评过的：{orderId: Set(productId or 'ORDER')}
  const [reviewedMap, setReviewedMap] = useState({});

  // 评价弹窗态
  const [showModal, setShowModal] = useState(false);
  const [modalCtx, setModalCtx] = useState({ orderId: null, product: null });

  // 拉我的订单列表
  useEffect(() => {
    if (userName) dispatch(fetchMyOrders(userName));
  }, [dispatch, userName]);

  // 订单变化后，拉取“我已评过”的集合
  useEffect(() => {
    (async () => {
      if (!orders || !orders.length || !userName) return;
      const next = {};
      for (const o of orders) {
        try {
          const { data } = await axios.get(`/api/reviews/by-order/${o._id}/${encodeURIComponent(userName)}`);
          const set = new Set(data.map(r => r.productId ? String(r.productId) : 'ORDER'));
          next[o._id] = set;
        } catch (e) {
          // 静默
        }
      }
      setReviewedMap(next);
    })();
  }, [orders, userName]);

  const canReview = (o) => !o.isCancelable; // 取消按钮消失后才可评价（后端会再校验一次）
  const fmt = (n) => `$${Number(n || 0).toFixed(2)}`;

  // Reorder：合并/替换
  const reorder = (order, mode = 'merge') => {
    if (mode === 'replace') dispatch(emptyCart());
    (order.items || []).forEach(it => {
      dispatch(addItem({
        productId: it.productId,
        name: it.name,
        price: it.price,
        qty: it.qty,
        category: it.category,
      }));
    });
    alert(mode === 'replace' ? 'Cart replaced by this order.' : 'Items merged into cart.');
  };

  // 打开/提交评价
  const openReviewProduct = (orderId, product) => {
    setModalCtx({ orderId, product });
    setShowModal(true);
  };
  const openReviewOrder = (orderId) => {
    setModalCtx({ orderId, product: null });
    setShowModal(true);
  };
  const afterSubmit = async () => {
    const id = modalCtx.orderId;
    try {
      const { data } = await axios.get(`/api/reviews/by-order/${id}/${encodeURIComponent(userName)}`);
      const set = new Set(data.map(r => r.productId ? String(r.productId) : 'ORDER'));
      setReviewedMap(prev => ({ ...prev, [id]: set }));
    } catch {}
  };

  // 查看商品的所有评价（简化为 alert；你可改为弹窗列表）
  const viewProductReviews = async (product) => {
    const { data } = await axios.get(`/api/reviews/product/${product.productId}`);
    if (!data.length) return alert('No reviews yet.');
    alert(
      `Reviews for ${product.name}:\n\n` +
      data.map(r => `${'★'.repeat(r.rating)} ${r.comment || ''} — ${r.userId}`).join('\n')
    );
  };
  // 查看订单级评价（如果需要）
  const viewOrderReview = async (orderId) => {
    const { data } = await axios.get(`/api/reviews/order/${orderId}`);
    if (!data.length) return alert('No order review yet.');
    const r = data[0];
    alert(`Order review: ${'★'.repeat(r.rating)} ${r.comment || ''} — ${r.userId}`);
  };

  if (!userName) {
    return <div className="card"><h2>Orders</h2><p>Please login first.</p></div>;
  }

  return (
    <div className="card" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h2>Recent Orders</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color:'crimson' }}>{error}</p>}
      {(!orders || orders.length === 0) && !loading ? <p>No orders yet.</p> : null}

      {orders && orders.length > 0 && (
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign:'left' }}>Order #</th>
              <th style={{ textAlign:'left' }}>Placed At</th>
              <th style={{ textAlign:'left' }}>Status</th>
              <th style={{ textAlign:'right' }}>Total</th>
              <th style={{ textAlign:'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => {
              const reviewed = reviewedMap[o._id] || new Set();
              const orderReviewed = reviewed.has('ORDER');
              const total = o.paidTotal ?? o.payable ?? o.total;

              return (
                <React.Fragment key={o._id}>
                  <tr>
                    <td>
                      <button
                        onClick={() => toggle(o._id)}
                        style={{ marginRight: 6 }}
                        title={open[o._id] ? 'Hide details' : 'Show details'}
                      >
                        {open[o._id] ? '▾' : '▸'}
                      </button>
                      {o._id}
                    </td>
                    <td>{new Date(o.createdAt).toLocaleString()}</td>
                    <td>{o.computedStatus || o.status}</td>
                    <td style={{ textAlign:'right' }}>{fmt(total)}</td>
                    <td style={{ textAlign:'center' }}>
                      {o.isCancelable ? (
                        <button onClick={() => dispatch(cancelOrder(o._id))}>Cancel</button>
                      ) : (
                        <span style={{ color:'#777' }}>—</span>
                      )}
                    </td>
                  </tr>

                  {open[o._id] && (
                    <tr>
                      <td colSpan={5} style={{ background:'#fafafa' }}>
                        {/* 订单级评价 & Reorder */}
                        <div style={{
                          display:'flex', justifyContent:'space-between',
                          alignItems:'center', margin:'8px 0'
                        }}>
                          <div>
                            {orderReviewed ? (
                              <button onClick={() => viewOrderReview(o._id)}>
                                View Order Review
                              </button>
                            ) : (
                              <button
                                disabled={!canReview(o)}
                                onClick={() => openReviewOrder(o._id)}
                                title={!canReview(o) ? 'You can review after cancel window closes' : ''}
                              >
                                {canReview(o) ? 'Review Order' : 'Review after cancel window'}
                              </button>
                            )}
                          </div>
                          <div style={{ display:'flex', gap:8 }}>
                            <button onClick={() => reorder(o, 'merge')}>Reorder</button>
                            <button onClick={() => reorder(o, 'replace')}>Reorder (Replace)</button>
                          </div>
                        </div>

                        {/* 商品明细 + 针对每个商品的评价/查看 */}
                        <table className="table" style={{ width:'100%', marginTop: 6 }}>
                          <thead>
                            <tr>
                              <th style={{ textAlign:'left' }}>Item</th>
                              <th style={{ width:80, textAlign:'center' }}>Qty</th>
                              <th style={{ width:120, textAlign:'right' }}>Price</th>
                              <th style={{ width:160, textAlign:'right' }}>Subtotal</th>
                              <th style={{ width:200, textAlign:'center' }}>Review</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(o.items || []).map(it => {
                              const done = reviewed.has(String(it.productId));
                              const sub = Number(it.price) * Number(it.qty);
                              return (
                                <tr key={String(it.productId)}>
                                  <td>{it.name}</td>
                                  <td style={{ textAlign:'center' }}>{it.qty}</td>
                                  <td style={{ textAlign:'right' }}>{fmt(it.price)}</td>
                                  <td style={{ textAlign:'right' }}>{fmt(sub)}</td>
                                  <td style={{ textAlign:'center' }}>
                                    {done ? (
                                      <button onClick={() => viewProductReviews(it)}>
                                        View reviews
                                      </button>
                                    ) : (
                                      <button
                                        disabled={!canReview(o)}
                                        onClick={() => openReviewProduct(o._id, it)}
                                        title={!canReview(o) ? 'Review after cancel window' : ''}
                                      >
                                        {canReview(o) ? 'Review' : 'Review later'}
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}

      {/* 评价弹窗 */}
      <ReviewModal
        show={showModal}
        onClose={() => setShowModal(false)}
        orderId={modalCtx.orderId}
        product={modalCtx.product}
        userId={userName}
        onSubmitted={afterSubmit}
      />
    </div>
  );
}
