// client/src/components/pages/PayPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as QRCode from "qrcode";

export default function PayPage() {
  const { paymentId } = useParams();
  const nav = useNavigate();

  const [info, setInfo] = useState(null);    // {_id, appointmentId, amount, status, qrText?}
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [imgSrc, setImgSrc] = useState("");  // <img> 回退
  const [qrUrl, setQrUrl] = useState("");    // 展示/复制/打开用
  const canvasRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true); setErr("");
      try {
        const r = await fetch(`/api/payments/${paymentId}`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (cancelled) return;

        setInfo(data);

        // ① 规范化二维码内容：如果后端给的是 http(s)，就用；否则用本机可访问确认页
        const serverQR = data.qrText || "";
        const isHttp = /^https?:\/\//i.test(serverQR);
        const base = window.location.origin; // 也可用你的 VITE_LAN_ORIGIN
        const url = isHttp ? serverQR : `${base}/pay/confirm/${paymentId}`;
        setQrUrl(url);

        // ② 生成二维码（canvas 优先）
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, url, {
            width: 240,
            margin: 2,
            errorCorrectionLevel: "M",
            color: { dark: "#111111", light: "#FFFFFF" }, // 黑/白
          });
        }

        // ③ 再生成一份 dataURL，作为回退 <img>
        try {
          const png = await QRCode.toDataURL(url, {
            width: 240,
            margin: 2,
            errorCorrectionLevel: "M",
            color: { dark: "#111111", light: "#FFFFFF" },
          });
          if (!cancelled) setImgSrc(png);
        } catch (_) {}
      } catch (e) {
        if (!cancelled) setErr(String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [paymentId]);

  const onRefresh = async () => {
    try {
      const r = await fetch(`/api/payments/${paymentId}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setInfo(await r.json());
    } catch (e) {
      setErr(String(e));
    }
  };

  // 模拟“我已付款”（本地点一下即可，不需要手机）
  const onPaidSimulate = async () => {
    try {
      const r = await fetch(`/api/payments/${paymentId}/confirm`, { method: "POST" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setInfo(d);
      // 需要的话可自动跳回
      // nav("/my/schedule");
    } catch (e) {
      setErr(String(e));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 8 }}>Scan &amp; Pay</h2>
      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "salmon" }}>{err}</p>}

      {info && (
        <>
          <p style={{ opacity: .85 }}>
            Appointment: <strong>{String(info.appointmentId || "").slice(-6)}</strong>
          </p>
          <p style={{ opacity: .85, marginTop: -4 }}>
            Amount: <strong>${Number(info.amount || 0).toFixed(2)}</strong>
            {" · "}
            Status: <strong>{info.status}</strong>
          </p>

          {/* 白底卡片，暗色背景也清晰 */}
          <div
            style={{
              marginTop: 12,
              padding: 12,
              background: "#FFFFFF",
              borderRadius: 12,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,.25)",
              minWidth: 264,
              minHeight: 264,
            }}
          >
            {/* canvas 主体 */}
            <canvas
              ref={canvasRef}
              width={240}
              height={240}
              style={{ display: imgSrc ? "none" : "block" }}
            />
            {/* 回退 img，确保能看到 */}
            {imgSrc && (
              <img
                src={imgSrc}
                alt="QR code"
                width={240}
                height={240}
                style={{ imageRendering: "pixelated" }}
              />
            )}
          </div>

          {/* 链接可视化 + 操作按钮（不需要手机扫描） */}
          <div className="subtle" style={{ marginTop: 12, wordBreak: "break-all" }}>
            Link:&nbsp;
            <a href={qrUrl} target="_blank" rel="noreferrer">{qrUrl}</a>
          </div>
          <div className="row" style={{ gap: 8, marginTop: 8 }}>
            <button className="btn" onClick={() => navigator.clipboard?.writeText(qrUrl)}>Copy link</button>
            <button className="btn" onClick={() => window.open(qrUrl, "_blank")}>Open here</button>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <button className="btn" onClick={onPaidSimulate}>I have paid (simulate)</button>
            <button className="btn" onClick={onRefresh}>Refresh</button>
            <button className="btn" onClick={() => nav("/my/schedule")}>Back to My Schedule</button>
          </div>
        </>
      )}
    </div>
  );
}
