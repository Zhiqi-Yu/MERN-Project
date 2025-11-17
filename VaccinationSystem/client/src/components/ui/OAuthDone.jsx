// client/src/components/ui/OAuthDone.jsx
import React, { useEffect, useState } from "react";

export default function OAuthDone() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/auth/github/me", { credentials: "include" });
        const d = await r.json();
        setUser(d.user || null);
        // 需要的话 1-2秒后跳回主页：
        // setTimeout(()=> window.location.href = "/", 1200);
      } catch {}
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>OAuth Completed</h2>
      {user ? (
        <p>Welcome, <b>{user.name}</b> ({user.login}) 🎉</p>
      ) : (
        <p>Reading session…</p>
      )}
      <button className="btn" onClick={()=> window.location.href="/"}>Go Home</button>
    </div>
  );
}
