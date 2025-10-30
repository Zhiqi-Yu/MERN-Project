// 文件顶部新增：
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listHospitalVaccines } from "../../redux/actions/hospitalActions";

export default function HospitalDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, items, error } = useSelector(s => s.hospitalVaccines);
  const [hospital, setHospital] = useState(null);        // ⬅️ 新增：取医院名

  useEffect(() => {
    dispatch(listHospitalVaccines(id));
    // 取医院详情（只为拿名字）
    fetch(`/api/hospitals/${id}`).then(r => r.json()).then(setHospital);
  }, [dispatch, id]);

  return (
    <div>
      <h1 className="h1">Hospital Detail{hospital ? ` — ${hospital.name}` : ""}</h1>
      {loading && <p className="subtle">Loading...</p>}
      {error && <p style={{color:"salmon"}}>{String(error)}</p>}

      <div className="card">
        <ul style={{paddingLeft:18, margin:0}}>
          {items.map(x => {
            const disabled = !x.stock || x.stock <= 0;
            return (
              <li key={x.id || (x.vaccine && x.vaccine.id)} style={{margin:'10px 0'}}>
                <b>{x.vaccine?.name}</b> <span className="subtle">· {x.vaccine?.type}</span>
                <span className="pill" style={{marginLeft:8}}>
                  {x.stock>0 ? `${x.stock} in stock` : 'Out of stock'}
                </span>
                <span className="subtle" style={{marginLeft:10}}>price: ${x.price}</span>
                <Link
                  className={`btn btn-primary${disabled ? ' btn--disabled' : ''}`}
                  style={{marginLeft:12}}
                  to={`/book/${id}/${x.vaccine?.id}`}
                  state={{ hospitalName: hospital?.name, vaccineName: x.vaccine?.name }}
                  onClick={(e)=>{ if (disabled) e.preventDefault(); }}
                >
                  Book
                </Link>
              </li>
            );
          })}
          {items.length === 0 && <li className="subtle">No vaccines on hand.</li>}
        </ul>
      </div>
    </div>
  );
}
