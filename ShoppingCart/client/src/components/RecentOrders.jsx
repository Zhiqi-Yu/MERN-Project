import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders, cancelOrder } from '../redux/actions/orderActions';

export default function RecentOrders() {
  const dispatch = useDispatch();
  const { name: userName } = useSelector(s => s.user || { name: '' });
  const { loading, error, items } = useSelector(s => s.orders);

  useEffect(() => {
    if (userName) dispatch(fetchMyOrders(userName));
  }, [dispatch, userName]);

  if (!userName) {
    return <div className="card"><h2>Orders</h2><p>Please login first.</p></div>;
  }

  return (
    <div className="card" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h2>Recent Orders</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color:'crimson' }}>{error}</p>}
      {(!items || items.length === 0) && !loading ? <p>No orders yet.</p> : null}

      {items && items.length > 0 && (
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
            {items.map(o => (
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td>{o.computedStatus || o.status}</td>
                <td style={{ textAlign:'right' }}>${Number(o.total || 0).toFixed(2)}</td>
                <td style={{ textAlign:'center' }}>
                  {o.isCancelable ? (
                    <button onClick={() => dispatch(cancelOrder(o._id))}>
                      Cancel
                    </button>
                  ) : (
                    <span style={{ color:'#777' }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
