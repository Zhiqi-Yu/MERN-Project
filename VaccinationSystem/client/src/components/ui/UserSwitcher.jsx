import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, setCurrentUser, restoreCurrentUser, clearCurrentUser } from "../../redux/actions/userActions";

export default function UserSwitcher() {
  const dispatch = useDispatch();
  const { items = [] } = useSelector(s => s.users || {});
  const current = useSelector(s => s.currentUser?.user || null);

  useEffect(() => {
    dispatch(restoreCurrentUser());
    dispatch(loadUsers());
  }, [dispatch]);

  const onChange = (e) => {
    const id = e.target.value;
    const user = items.find(u => String(u._id) === id) || null;
    if (user) dispatch(setCurrentUser(user));
  };

  return (
    <div style={{ marginLeft: "auto", display:"flex", alignItems:"center", gap:8 }}>
      <span style={{opacity:.6}}>User:</span>
      <select value={current?._id || ""} onChange={onChange}>
        <option value="" disabled>Select user</option>
        {items.map(u => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.role})
          </option>
        ))}
      </select>
      {current && (
        <button className="btn" onClick={() => dispatch(clearCurrentUser())}>Clear</button>
      )}
    </div>
  );
}
