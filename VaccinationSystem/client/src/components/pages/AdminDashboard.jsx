import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHV, updateHV, createHV } from "../../redux/actions/hvActions";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { loading, items = [], error } = useSelector(s => s.hvList || {});
  const { loading: saving } = useSelector(s => s.hvMutate || {});

  // ✅ 新增：下拉数据（本地 state，不走 Redux）
  const [hospitalsMini, setHospitalsMini] = useState([]);
  const [vaccinesMini,  setVaccinesMini]  = useState([]);

  // 简单上架表单
  const [form, setForm] = useState({ hospitalId: "", vaccineId: "", stock: 0, chargeOverride: "" });

  useEffect(() => { 
    dispatch(listHV()); 
    fetch("/api/hospitals/mini").then(r => r.json()).then(setHospitalsMini);
    fetch("/api/vaccines/mini").then(r => r.json()).then(setVaccinesMini);
  }, [dispatch]);

  const onPatch = (row, key, val) => {
    const patch = { [key]: val };
    dispatch(updateHV(row._id, patch));
  };

  const onCreate = (e) => {
    e.preventDefault();
    const payload = {
      hospitalId: form.hospitalId.trim(),
      vaccineId:  form.vaccineId.trim(),
      stock: Number(form.stock) || 0
    //   ...(form.chargeOverride !== "" ? { chargeOverride: Number(form.chargeOverride) } : {})
    };
    if (!payload.hospitalId || !payload.vaccineId) return alert("hospitalId / vaccineId is required!");
    dispatch(createHV(payload));
    setForm({ hospitalId: "", vaccineId: "", stock: 0, chargeOverride: "" }); // Clear the form after submission
  };

  return (
    <div>
      <h2>Admin • Inventory</h2>

      <h3>Add vaccines</h3>
      <form onSubmit={onCreate} style={{display:"grid", gridTemplateColumns:"minmax(260px,1fr) minmax(260px,1fr) 160px auto", gap:8, maxWidth:980}}>
        
        {/* hospital dropdown menu */}
        <select value={form.hospitalId}
                onChange={e=>setForm({...form, hospitalId:e.target.value})}>
          <option value="">Select hospital…</option>
          {hospitalsMini.map(h => (
            <option key={h._id} value={h._id}>{h.name} ({h.city})</option>
          ))}
        </select>

        {/* vaccine dropdown menu */}
        <select value={form.vaccineId}
                onChange={e=>setForm({...form, vaccineId:e.target.value})}>
          <option value="">Select vaccine…</option>
          {vaccinesMini.map(v => (
            <option key={v._id} value={v._id}>{v.name} · {v.type} (${v.price})</option>
          ))}
        </select>

        {/* stock */}
        <input type="number" min="0" placeholder="Add stock"
               value={form.stock}
               onChange={e=>setForm({...form, stock:e.target.value})} />

        <button className="btn" type="submit" disabled={saving}>add</button>
        {/* price */}
        {/* <input type="number" placeholder="price override (if any)"
               value={form.chargeOverride}
               onChange={e=>setForm({...form, chargeOverride:e.target.value})} />

        <button className="btn" type="submit" disabled={saving}>Create</button> */}
      </form>

      <h3 style={{marginTop:20}}>Current vaccines</h3>
      {loading && <p>Loading…</p>}
      {error && <p style={{color:"red"}}>{error}</p>}
      <table style={{borderCollapse:"collapse", width:"100%", maxWidth:900}}>
        <thead>
            <tr>
                <th align="left">hospital</th>
                <th align="left">vaccine</th>
                <th align="right">stock</th>
                <th align="right">base price</th>
                <th align="right">price override</th>
                <th align="right">final price</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {items.map(row => (
                <tr key={row._id}>
                <td>{row.hospitalName} <span style={{opacity:.6}}>({row.city})</span></td>
                <td>{row.vaccineName} <span style={{opacity:.6}}>· {row.vaccineType}</span></td>
                <td align="right">
                    <input style={{width:90}} type="number" defaultValue={row.stock ?? 0}
                        onBlur={e=>onPatch(row, "stock", Number(e.target.value))}/>
                </td>
                <td align="right">${row.basePrice ?? 0}</td>
                <td align="right">
                    <input style={{width:120}} type="number" placeholder="leave empty = base"
                        defaultValue={row.chargeOverride ?? ""}
                        onBlur={e=>{
                            const v = e.target.value;
                            onPatch(row, "chargeOverride", v === "" ? null : Number(v));
                        }}/>
                </td>
                <td align="right">${row.finalPrice ?? row.basePrice ?? 0}</td>
                <td></td>
                </tr>
            ))}
            </tbody>

      </table>
    </div>
  );
}
