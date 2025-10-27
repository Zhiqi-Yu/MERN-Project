import {
  APPOINTMENT_CREATE_REQUEST, APPOINTMENT_CREATE_SUCCESS, APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_LIST_REQUEST,   APPOINTMENT_LIST_SUCCESS,   APPOINTMENT_LIST_FAIL
} from "../constants/appointmentConstants";

export const createAppointment = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_CREATE_REQUEST });
    const state = getState();
    const currentUser = state.currentUser?.user || null;

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        userId: currentUser?._id || null
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    dispatch({ type: APPOINTMENT_CREATE_SUCCESS, payload: data });
    return data;
  } catch (e) {
    dispatch({ type: APPOINTMENT_CREATE_FAIL, payload: e.message || "Create failed" });
    throw e;
  }
};

export const listAppointments = (userId) => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_LIST_REQUEST });
    const qs = userId ? `?userId=${encodeURIComponent(userId)}` : "";
    const res = await fetch(`/api/appointments${qs}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    dispatch({ type: APPOINTMENT_LIST_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: APPOINTMENT_LIST_FAIL, payload: e.message || "Load failed" });
  }
};
