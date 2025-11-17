import React, { useEffect, useState } from "react";

export default function GitHubLogin(){
  const [me, setMe] = useState(null);

  const fetchMe = async () => {
    const r = await fetch('http://localhost:9002/auth/github/me', { credentials: 'include' });
    setMe(await r.json());
  };

  useEffect(()=>{ fetchMe(); }, []);

  const login = () => {
    window.location.href = 'http://localhost:9002/auth/github/login';
  };
  const logout = async () => {
    await fetch('http://localhost:9002/auth/github/logout', { method:'POST', credentials:'include' });
    fetchMe();
  };

  if (me) {
    return (
      <div style={{display:'flex', alignItems:'center', gap:8}}>
        <img alt="" src={me.avatar} width={24} height={24} style={{borderRadius:12}}/>
        <span>{me.login || me.name}</span>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
    );
  }
  return <button className="btn" onClick={login}>Sign in with GitHub</button>;
}
