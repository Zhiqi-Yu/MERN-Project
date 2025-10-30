import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../redux/actions/appointmentActions";

// 生成当天 09:00-16:00 的半小时档位（本地时区）
function buildSlots(dateStr, open="09:00", close="16:00", stepMin=30){
  // dateStr: "YYYY-MM-DD"
  const [oh, om] = open.split(":").map(Number);
  const [ch, cm] = close.split(":").map(Number);
  const start = new Date(`${dateStr}T${String(oh).padStart(2,"0")}:${String(om).padStart(2,"0")}:00`);
  const end   = new Date(`${dateStr}T${String(ch).padStart(2,"0")}:${String(cm).padStart(2,"0")}:00`);
  const list  = [];
  for(let t = new Date(start); t < end; t = new Date(t.getTime()+stepMin*60000)){
    list.push(new Date(t));
  }
  return list;
}
function toDateStr(d){ return d.toISOString().slice(0,10); }
function toHM(d){ return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"); }

export default function BookingPage(){
  const { hospitalId, vaccineId } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();

  // 当前模拟用户（UserSwitcher 写入的）。做兼容：current / currentUser，id / _id / uid
  const currentUser = useSelector(s => (s.user && (s.user.current || s.user.currentUser)) || null);
  const currentUserId = currentUser?.id || currentUser?._id || currentUser?.uid || null;

  // 名称（透传/兜底再查）
  const [names, setNames] = useState({
    hospitalName: state?.hospitalName,
    vaccineName: state?.vaccineName
  });
  useEffect(() => {
    if (!names.hospitalName) {
      fetch(`/api/hospitals/${hospitalId}`).then(r=>r.json()).then(d=>setNames(s=>({...s,hospitalName:d.name})));
    }
    if (!names.vaccineName) {
      fetch(`/api/vaccines/${vaccineId}`).then(r=>r.json()).then(d=>setNames(s=>({...s,vaccineName:d.name})));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitalId, vaccineId]);

  // 选择日期（默认今天）
  const [dateStr, setDateStr] = useState(() => toDateStr(new Date()));

  // 已占用档期（ISO 数组）
  const [booked, setBooked] = useState([]);
  useEffect(() => {
    (async () => {
      const r = await fetch(`/api/appointments/slots?hospitalId=${encodeURIComponent(hospitalId)}&date=${encodeURIComponent(dateStr)}`);
      if (r.ok) setBooked(await r.json()); else setBooked([]);
    })();
  }, [hospitalId, dateStr]);

  const slots = useMemo(() => buildSlots(dateStr, "09:00", "16:00", 30), [dateStr]);

  // 选择的档位
  const [selected, setSelected] = useState(null);

  // 占用判断：把 booked ISO → 同一天的 HH:mm 集合
  const bookedHM = useMemo(() => {
    const set = new Set();
    booked.forEach(iso => {
      const d = new Date(iso);
      // 只对比时分
      set.add(toHM(d));
    });
    return set;
  }, [booked]);

  const { loading, error } = useSelector(s => s.appointmentCreate || {});

  const onConfirm = async () => {
    if (!selected) return;
    const iso = selected.toISOString(); // 直接用本地时区转 ISO
    await dispatch(createAppointment({
      hospitalId, vaccineId, scheduledAt: iso,
      ...(currentUserId ? { userId: currentUserId } : {})
    }));
    nav("/my/schedule");
  };

  return (
    <div>
      <h1 className="h1">Booking & Payment</h1>

      <div className="card mb-10">
        <div className="row mb-10">
          <span className="pill">Hospital: {names.hospitalName || "…"}</span>
          <span className="pill">Vaccine: {names.vaccineName || "…"}</span>
        </div>

        <div className="row mb-10">
          <label className="subtle">Pick a date</label>
          <input className="input" type="date" value={dateStr} onChange={e=>{setDateStr(e.target.value); setSelected(null);}}/>
        </div>

        <div className="slot-grid">
          {slots.map(s => {
            const label = toHM(s);
            const disabled = bookedHM.has(label) || s < new Date(); // 当天已过时刻也禁用
            const isSel = selected && toHM(selected)===label;
            return (
              <button key={label}
                type="button"
                className="slot"
                style={isSel ? {borderColor:"#3b6fe0", boxShadow:"0 0 0 3px rgba(79,140,255,.15)"} : undefined}
                disabled={disabled}
                onClick={()=>setSelected(s)}>
                {label}
              </button>
            );
          })}
        </div>

        <div className="row mt-20">
          <button className="btn btn-primary" disabled={!selected || loading} onClick={onConfirm}>
            {loading ? "Processing..." : "Pay & Schedule"}
          </button>
          {error && <span style={{color:"salmon"}}>{String(error)}</span>}
        </div>

        <p className="subtle" style={{marginTop:8}}>
          version1: Clicking the button will be considered a successful payment and will only create a reservation record;
        </p>
      </div>
    </div>
  );
}
