import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHospitals } from "../../redux/actions/hospitalActions";
import { Link } from "react-router-dom";

export default function SearchPage() {
    const [q, setQ] = useState("");
    const [city, setCity] = useState("");
    const dispatch = useDispatch();
    const { loading, items, error } = useSelector(s => s.hospitalList);


    const onSearch = (e) => {
        e.preventDefault();

        // 只构建一个普通对象；不要写成 { params } 或 { params: {...} }
        const payload = {};
        if (q && q.trim()) payload.q = q.trim();
        if (city && city.trim()) payload.city = city.trim();

        console.log("dispatch listHospitals payload =>", payload);
        dispatch(listHospitals(payload));
    };

  
  return (
    <div>
      <h2>Search Hospitals</h2>
      <form onSubmit={onSearch} style={{display:"flex", gap:8, marginBottom:12}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Hospital name..." />
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City..." />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:"red"}}>{error}</p>}
      <ul>
        {!loading && items.length === 0 && !q && !city && (
            <p style={{opacity:.7}}>Enter the conditions and click「Search」to start.</p>
        )}
        {items.map(h => (
          <li key={h._id || h.id}>
            <strong>{h.name}</strong> — {h.city}
            {/* {" "} <Link to={`/hospital/${h._id || h.id}`}>View</Link> */}
            <Link className="btn" to={`/hospital/${h._id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
