// client/src/components/pages/ReportsPage.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";

// —— 统一颜色盘（深色主题友好） ——
const PALETTE = ["#8AB4FF", "#F28B82", "#80CBC4", "#F7C948", "#CF93FA", "#7DD3FC", "#A3E635", "#F472B6"];

const Card = ({ title, children }) => (
  <div style={{padding:16, border:"1px solid #2a2a2a", borderRadius:12, background:"#0f1115"}}>
    <h3 style={{margin:"0 0 12px"}}>{title}</h3>
    {children}
  </div>
);

const Legend = ({ items }) => (
  <div style={{display:"flex", flexWrap:"wrap", gap:12, marginTop:12}}>
    {items.map((it, i)=>(
      <div key={i} style={{display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#cbd5e1"}}>
        <span style={{display:"inline-block", width:10, height:10, borderRadius:2, background:it.color}}/>
        <span>{it.label}</span>
      </div>
    ))}
  </div>
);

/* --- 简单 Tooltip（不依赖库） --- */
function useTooltip(){
  const ref = useRef(null);
  const show = (x,y,html)=>{
    const el = ref.current; if(!el) return;
    el.style.display = "block";
    el.style.left = x + 12 + "px";
    el.style.top  = y + 12 + "px";
    el.innerHTML = html;
  };
  const hide = ()=>{ if(ref.current) ref.current.style.display="none"; };
  const node = (
    <div
      ref={ref}
      style={{
        position:"fixed", zIndex:50, display:"none",
        padding:"8px 10px", fontSize:12, color:"#E6E9EF",
        background:"rgba(20,22,30,.96)", border:"1px solid rgba(255,255,255,.12)",
        borderRadius:8, pointerEvents:"none", maxWidth:260, lineHeight:1.35
      }}
    />
  );
  return { node, show, hide };
}

/* --- 柱状图 --- */
function BarChart({ data, valueKey="count", labelKey="label", height=220, colors=PALETTE }){
  const { node, show, hide } = useTooltip();
  const max = Math.max(1, ...data.map(d => d[valueKey] || 0));
  const barW = 44, gap = 18, padBottom = 26, padTop = 14;
  const width = data.length * (barW + gap) + gap;

  return (
    <>
      <svg width={width} height={height} onMouseLeave={hide}>
        {data.map((d,i)=>{
          const val = d[valueKey] || 0;
          const h = Math.round((val / max) * (height - padBottom - padTop));
          const x = gap + i*(barW+gap);
          const y = height - padBottom - h;
          const color = colors[i % colors.length];
          return (
            <g key={i}
               onMouseEnter={e=>show(e.clientX, e.clientY, `<strong>${d[labelKey]}</strong><br/>Count: ${val}`)}
               onMouseMove={e=>show(e.clientX, e.clientY, `<strong>${d[labelKey]}</strong><br/>Count: ${val}`)}
               onMouseLeave={hide}>
              <rect x={x} y={y} width={barW} height={h} rx="8" fill={color}/>
              <text x={x+barW/2} y={height-8} fontSize="12" textAnchor="middle" fill="#9aa4b2">
                {String(d[labelKey]).slice(0,10)}
              </text>
              <text x={x+barW/2} y={y-6} fontSize="12" textAnchor="middle" fill="#cbd5e1">
                {val}
              </text>
            </g>
          );
        })}
      </svg>
      {node}
    </>
  );
}

/* --- 饼图（带百分比 & 图例） --- */
function PieChart({ data, valueKey="count", labelKey="label", radius=96, colors=PALETTE }){
  const { node, show, hide } = useTooltip();
  const sum = data.reduce((a,b)=>a+(b[valueKey]||0),0) || 1;
  let angle = -Math.PI/2;
  const cx = radius+8, cy = radius+8, size = (radius+8)*2;

  return (
    <>
      <svg width={size} height={size} onMouseLeave={hide}>
        {data.map((d,i)=>{
          const val = d[valueKey] || 0;
          const v = val / sum;
          const a2 = angle + v * Math.PI * 2;
          const x1 = cx + radius * Math.cos(angle),  y1 = cy + radius * Math.sin(angle);
          const x2 = cx + radius * Math.cos(a2),     y2 = cy + radius * Math.sin(a2);
          const large = v > .5 ? 1 : 0;
          const path = `M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${large} 1 ${x2},${y2} Z`;
          const mid = (angle + a2)/2;
          const lx = cx + (radius*0.65) * Math.cos(mid);
          const ly = cy + (radius*0.65) * Math.sin(mid);
          const color = colors[i % colors.length];
          const pct = Math.round(v*100);

          const html = `<strong>${d[labelKey]}</strong><br/>Count: ${val}<br/>${pct}%`;
          const seg = (
            <g key={i}
              onMouseEnter={e=>show(e.clientX, e.clientY, html)}
              onMouseMove={e=>show(e.clientX, e.clientY, html)}
              onMouseLeave={hide}>
              <path d={path} fill={color}/>
              {pct >= 3 && (
                <text x={lx} y={ly} fontSize="12" textAnchor="middle" fill="#0f1115" fontWeight="700">
                  {pct}%
                </text>
              )}
            </g>
          );
          angle = a2;
          return seg;
        })}
      </svg>
      {node}
    </>
  );
}

export default function ReportsPage(){
  const [range, setRange] = useState(()=>{
    const end = new Date().toISOString().slice(0,10);
    const d = new Date(); d.setDate(d.getDate()-6);
    const start = d.toISOString().slice(0,10);
    return { start, end };
  });
  const [byV, setByV] = useState([]);      // [{vaccineName,count}]
  const [byH, setByH] = useState([]);      // [{hospitalName,city,count}]
  const [daily, setDaily] = useState([]);  // [{date,count}]
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchAll = async ()=>{
    setLoading(true); setErr("");
    try{
      const qs = `start=${range.start}&end=${range.end}`;
      const [rv, rh, rd] = await Promise.all([
        fetch(`/api/reports/by-vaccine?${qs}`),
        fetch(`/api/reports/by-hospital?${qs}`),
        fetch(`/api/reports/daily?days=7`)
      ]);
      if(!rv.ok || !rh.ok || !rd.ok) throw new Error("report http error");
      setByV(await rv.json());
      setByH(await rh.json());
      setDaily(await rd.json());
    }catch(e){ setErr(String(e)); }
    finally{ setLoading(false); }
  };

  useEffect(()=>{ fetchAll(); }, []);
  const onApply = (e)=>{ e.preventDefault(); fetchAll(); };

  const pieData  = useMemo(()=> byV.map((x,i)=>({ label: x.vaccineName, count: x.count, color: PALETTE[i%PALETTE.length] })), [byV]);
  const barHosp  = useMemo(()=> byH.slice(0,6).map((x,i)=>({ label: x.hospitalName, count: x.count, color: PALETTE[i%PALETTE.length] })), [byH]);
  const barDaily = useMemo(()=> daily.map((x,i)=>({ label: x.date.slice(5), count: x.count, color: PALETTE[i%PALETTE.length] })), [daily]);

  return (
    <div>
      <h2>Reports</h2>

      <form onSubmit={onApply} style={{display:"flex", gap:12, alignItems:"center", marginBottom:16}}>
        <label>Start: <input type="date" value={range.start} onChange={e=>setRange(s=>({...s,start:e.target.value}))}/></label>
        <label>End: <input type="date" value={range.end} onChange={e=>setRange(s=>({...s,end:e.target.value}))}/></label>
        <button className="btn" type="submit" disabled={loading}>Apply</button>
      </form>

      {loading && <p>Loading…</p>}
      {err && <p style={{color:"red"}}>{err}</p>}

      <div style={{display:"grid", gap:16, gridTemplateColumns:"1fr 1fr"}}>
        <Card title="Vaccine distribution (pie)">
          {pieData.length ? (
            <>
              <PieChart data={pieData}/>
              <Legend items={pieData}/>
            </>
          ) : <p>No data</p>}
        </Card>

        <Card title="Top hospitals by bookings (bar)">
          {barHosp.length ? (
            <>
              <BarChart data={barHosp}/>
              <Legend items={barHosp}/>
            </>
          ) : <p>No data</p>}
        </Card>

        <div style={{gridColumn:"1 / -1"}}>
          <Card title="Daily bookings (last 7 days)">
            {barDaily.length ? (
              <>
                <BarChart data={barDaily} />
                <Legend items={barDaily}/>
              </>
            ) : <p>No data</p>}
          </Card>
        </div>
      </div>
    </div>
  );
}
