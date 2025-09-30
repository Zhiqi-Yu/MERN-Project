// client/src/components/UserPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/actions/userActions';

export default function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector(s => s.user);
  const [name, setName] = useState(user.name || '');

  if (user.isLoggedIn) {
    return (
      <div className="card">
        <h2>User</h2>
        <p>Signed in as <strong>{user.name}</strong></p>
        <button onClick={()=>dispatch(logout())}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>User</h2>
      <label>
        Name
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Type a name, e.g. admin"/>
      </label>
      <button style={{marginTop:8}} onClick={()=>name && dispatch(login(name.trim()))}>
        Sign in
      </button>
      <p style={{color:'#666', marginTop:8}}>Tip: sign in as <strong>admin</strong> to unlock “Save Product”.</p>
    </div>
  );
}
