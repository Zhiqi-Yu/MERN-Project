// client/src/components/NotificationBell.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNotifications, markRead } from '../redux/actions/notificationActions';
import { useNavigate } from 'react-router-dom';

export default function NotificationBell() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { open, list } = useSelector(s => s.notifications || { open:false, list: [] });
  const unread = list.filter(n => !n.read).length;

  const onClickItem = (n) => {
    dispatch(markRead(n.id));
    if (n.link) {
      if (typeof n.link === 'string') navigate(n.link);
      else navigate(n.link.pathname || '/', { state: n.link.state, replace: false });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => dispatch(toggleNotifications())}
        title="Notifications"
        style={{
          position:'relative', border:'none', background:'transparent',
          cursor:'pointer', padding: 6
        }}
      >
        🔔
        {unread > 0 && (
          <span style={{
            position:'absolute', top:0, right:0, transform:'translate(40%,-40%)',
            background:'#e02424', color:'#fff', borderRadius:'999px',
            fontSize:12, lineHeight:'16px', minWidth:16, height:16, padding:'0 4px',
            display:'inline-flex', alignItems:'center', justifyContent:'center'
          }}>
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position:'absolute', top:'110%', right:0, width:320, maxHeight:380, overflow:'auto',
          background:'#fff', border:'1px solid #ddd', borderRadius:10, boxShadow:'0 12px 28px rgba(0,0,0,.15)',
          zIndex: 999
        }}>
          <div style={{ padding:'8px 12px', borderBottom:'1px solid #eee', fontWeight:600 }}>
            Notifications
          </div>
          {list.length === 0 && <div style={{ padding:12, color:'#666' }}>No notifications</div>}
          {list.map(n => (
            <div
              key={n.id}
              onClick={() => onClickItem(n)}
              style={{
                padding:'10px 12px', cursor:'pointer',
                background: n.read ? '#fff' : '#f6fbff'
              }}
            >
              <div style={{ fontSize:14 }}>{n.message}</div>
              <div style={{ color:'#999', fontSize:12 }}>
                {new Date(n.createdAt).toLocaleString()} · {n.type || 'info'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
