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
      <h2>Hospital Detail{hospital ? ` — ${hospital.name}` : ""}</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:"red"}}>{String(error)}</p>}

      <ul>
        {items.map(x => {
          const disabled = !x.stock || x.stock <= 0;
          return (
            <li key={x.id || (x.vaccine && x.vaccine.id)}>
              {x.vaccine?.name} · {x.vaccine?.type} · doses:{x.vaccine?.dosesRequired}
              · stock:{x.stock ?? 0} · price:${x.price}
              <Link
                className={`btn ${disabled ? "btn--disabled" : ""}`}
                to={`/book/${id}/${x.vaccine?.id}`}
                // 把名字透传过去，Booking 页就不用再查一次
                state={{ hospitalName: hospital?.name, vaccineName: x.vaccine?.name }}
                onClick={(e) => { if (disabled) e.preventDefault(); }}
              >
                Book
              </Link>
            </li>
          );
        })}
        {items.length === 0 && <li>The hospital currently has no vaccines on hand</li>}
      </ul>
    </div>
  );
}
