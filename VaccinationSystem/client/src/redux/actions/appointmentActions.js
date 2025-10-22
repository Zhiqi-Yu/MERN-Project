import {
  APPOINTMENT_CREATE_REQUEST, APPOINTMENT_CREATE_SUCCESS, APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_LIST_REQUEST,   APPOINTMENT_LIST_SUCCESS,   APPOINTMENT_LIST_FAIL
} from "../constants/appointmentConstants";

export const createAppointment = (payload) => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_CREATE_REQUEST });
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
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

export const listAppointments = () => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_LIST_REQUEST });
    const res = await fetch("/api/appointments");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    dispatch({ type: APPOINTMENT_LIST_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: APPOINTMENT_LIST_FAIL, payload: e.message || "Load failed" });
  }
};
