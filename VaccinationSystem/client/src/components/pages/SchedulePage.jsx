import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAppointments } from "../../redux/actions/appointmentActions";

export default function SchedulePage() {
  const dispatch = useDispatch();
  const { loading, items = [], error } = useSelector(s => s.appointmentList || {});

  useEffect(() => { dispatch(listAppointments()); }, [dispatch]);

  const now = Date.now();
  const future = useMemo(() => items.filter(a => new Date(a.scheduledAt).getTime() > now), [items]);
  const past   = useMemo(() => items.filter(a => new Date(a.scheduledAt).getTime() <= now), [items]);

  return (
    <div>
      <h2>My Schedule</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:"red"}}>{error}</p>}

      <h3>Upcoming (待接种)</h3>
      <ul>
        {future.map(a => (
          <li key={a._id}>
            #{a._id.slice(-6)} · {new Date(a.scheduledAt).toLocaleString()} · status: {a.status}
          </li>
        ))}
        {future.length === 0 && <li>暂无</li>}
      </ul>

      <h3>History</h3>
      <ul>
        {past.map(a => (
          <li key={a._id}>
            #{a._id.slice(-6)} · {new Date(a.scheduledAt).toLocaleString()} · status: {a.status}
          </li>
        ))}
        {past.length === 0 && <li>暂无</li>}
      </ul>
    </div>
  );
}
