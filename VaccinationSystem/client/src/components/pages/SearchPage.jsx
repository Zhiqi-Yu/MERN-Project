import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHospitals, clearHospitalList } from "../../redux/actions/hospitalActions";
import { Link } from "react-router-dom";

export default function SearchPage() {
    const [q, setQ] = useState("");
    const [city, setCity] = useState("");
    const dispatch = useDispatch();
    const { loading, items, error } = useSelector(s => s.hospitalList);

    const currentUserId = useSelector(s =>
      (s.user?.current || s.user?.currentUser)?._id ||
      (s.user?.current || s.user?.currentUser)?.id ||
      null
    );

    useEffect(() => {
      // 切换用户或首次进入时，清空上一次的搜索结果
      dispatch(clearHospitalList());
      // 也顺手清一下输入框
      setQ(""); setCity("");
    }, [dispatch, currentUserId]);


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
      <h1 className="h1">Search Hospitals</h1>

      <div className="card mb-10">
        <form onSubmit={onSearch} className="row">
          <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Hospital name..." />
          <input className="input" value={city} onChange={e=>setCity(e.target.value)} placeholder="City..." />
          <button className="btn btn-primary" type="submit">Search</button>
        </form>
      </div>

      {loading && <p className="subtle">Loading...</p>}
      {error && <p style={{color:"salmon"}}>{error}</p>}

      <ul style={{paddingLeft:18}}>
        {!loading && items.length === 0 && !q && !city && (
          <p className="subtle">Enter conditions and click “Search” to start.</p>
        )}
        {items.map(h => (
          <li key={h._id || h.id} style={{margin:'10px 0'}}>
            <strong>{h.name}</strong> <span className="subtle">— {h.city}</span>
            <Link className="btn" style={{marginLeft:10}} to={`/hospital/${h._id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
