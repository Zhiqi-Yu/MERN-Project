import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../redux/actions/appointmentActions";

export default function BookingPage() {
  const { hospitalId, vaccineId } = useParams();
  const { state } = useLocation();  // 从链接透传来的名字（可能为 undefined）
  const [names, setNames] = useState({
    hospitalName: state?.hospitalName,
    vaccineName: state?.vaccineName
  });

  // 如果刷新导致 state 丢失，再查一次
  useEffect(() => {
    if (!names.hospitalName) {
      fetch(`/api/hospitals/${hospitalId}`).then(r => r.json()).then(d =>
        setNames(s => ({ ...s, hospitalName: d.name }))
      );
    }
    if (!names.vaccineName) {
      fetch(`/api/vaccines/${vaccineId}`).then(r => r.json()).then(d =>
        setNames(s => ({ ...s, vaccineName: d.name }))
      );
    }
  // 只依赖 id（避免反复 setNames 触发）
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitalId, vaccineId]);

  const [scheduledAt, setScheduledAt] = useState(() => {
    const t = new Date(Date.now() + 60 * 60 * 1000);
    // 注意：某些浏览器 locale 下 <input datetime-local> 需要 yyyy-MM-ddTHH:mm
    return t.toISOString().slice(0, 16);
  });

  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading, error } = useSelector(s => s.appointmentCreate || {});

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createAppointment({
      hospitalId, vaccineId,
      scheduledAt: new Date(scheduledAt).toISOString()
    }));
    nav("/my/schedule");
  };

  return (
    <div>
      <h2>Booking & Payment</h2>
      <p>
        <strong>Hospital:</strong> {names.hospitalName || "…"}
        {" · "}
        <strong>Vaccine:</strong> {names.vaccineName || "…"}
      </p>

      <form onSubmit={onSubmit} style={{display:"flex", gap: 8, alignItems:"center"}}>
        <label>
          Schedule:
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={e => setScheduledAt(e.target.value)}
            style={{marginLeft:8}}
            required
          />
        </label>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay & Schedule"}
        </button>
      </form>

      {error && <p style={{color:"red"}}>{String(error)}</p>}
      <p style={{marginTop:8,opacity:.7}}>（v1 简化：点击即视为支付成功，仅创建预约记录）</p>
    </div>
  );
}
