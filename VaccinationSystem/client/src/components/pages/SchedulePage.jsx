import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAppointments } from "../../redux/actions/appointmentActions";

export default function SchedulePage() {
  const dispatch = useDispatch();
  const current = useSelector((s) => s.currentUser?.user || null);
  const { loading, items = [], error } = useSelector((s) => s.appointmentList || {});

  useEffect(() => {
    if (current?._id) dispatch(listAppointments(current._id));
  }, [dispatch, current?._id]);

  const now = Date.now();
  const future = useMemo(
    () => items.filter((a) => new Date(a.scheduledAt).getTime() > now).sort((a,b)=>new Date(a.scheduledAt)-new Date(b.scheduledAt)),
    [items]
  );
  const past = useMemo(
    () => items.filter((a) => new Date(a.scheduledAt).getTime() <= now).sort((a,b)=>new Date(b.scheduledAt)-new Date(a.scheduledAt)),
    [items]
  );

  const fmt = (iso) => new Date(iso).toLocaleString();

  return (
    <div>
      <h2>My Schedule</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{String(error)}</p>}

      <h3>Upcoming (待接种)</h3>
      <ul>
        {future.map((a) => (
          <li key={a._id}>
            <strong>{a.hospitalName || "Hospital"}</strong>
            {" — "}
            <span>{a.vaccineName || "Vaccine"}</span>
            {" · "}
            <span>{fmt(a.scheduledAt)}</span>
            {" · "}
            <span>status: {a.status}</span>
          </li>
        ))}
        {future.length === 0 && <li>No Upcoming Vaccine Schedule.</li>}
      </ul>

      <h3>History</h3>
      <ul>
        {past.map((a) => (
          <li key={a._id}>
            <strong>{a.hospitalName || "Hospital"}</strong>
            {" — "}
            <span>{a.vaccineName || "Vaccine"}</span>
            {" · "}
            <span>{fmt(a.scheduledAt)}</span>
            {" · "}
            <span>status: {a.status}</span>
          </li>
        ))}
        {past.length === 0 && <li>No Vaccine Schedule History.</li>}
      </ul>
    </div>
  );
}
