import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function MobilePayConfirm() {
  const { paymentId } = useParams();
  const [msg, setMsg] = useState("");

  const confirm = async () => {
    setMsg("Processing…");
    try {
      const r = await fetch(`/api/payments/${paymentId}/confirm`, { method: "POST" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setMsg("✅ Payment marked as PAID. You may close this page.");
    } catch (e) {
      setMsg(`❌ Failed: ${String(e)}`);
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Confirm Payment</h2>
      <p>Payment ID: <code>{paymentId}</code></p>
      <button className="btn btn-primary" onClick={confirm}>Mark as Paid</button>
      {msg && <p style={{marginTop:12}}>{msg}</p>}
    </div>
  );
}
