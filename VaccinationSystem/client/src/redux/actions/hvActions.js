import {
  HV_LIST_REQUEST, HV_LIST_SUCCESS, HV_LIST_FAIL,
  HV_CREATE_REQUEST, HV_CREATE_SUCCESS, HV_CREATE_FAIL,
  HV_UPDATE_REQUEST, HV_UPDATE_SUCCESS, HV_UPDATE_FAIL
} from "../constants/hvConstants";

export const listHV = (hospitalId) => async (dispatch) => {
  dispatch({ type: HV_LIST_REQUEST });
  const qs = hospitalId ? `?hospitalId=${encodeURIComponent(hospitalId)}` : "";
  const r = await fetch(`/api/hospital-vaccines${qs}`);
  if (!r.ok) return dispatch({ type: HV_LIST_FAIL, payload: `HTTP ${r.status}` });
  dispatch({ type: HV_LIST_SUCCESS, payload: await r.json() });
};

export const createHV = (payload) => async (dispatch) => {
  dispatch({ type: HV_CREATE_REQUEST });
  const r = await fetch(`/api/hospital-vaccines`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!r.ok) return dispatch({ type: HV_CREATE_FAIL, payload: `HTTP ${r.status}` });
  dispatch({ type: HV_CREATE_SUCCESS, payload: await r.json() });
  dispatch(listHV()); 
};

export const updateHV = (id, patch) => async (dispatch) => {
  dispatch({ type: HV_UPDATE_REQUEST });
  const r = await fetch(`/api/hospital-vaccines/${id}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch)
  });
  if (!r.ok) return dispatch({ type: HV_UPDATE_FAIL, payload: `HTTP ${r.status}` });
  dispatch({ type: HV_UPDATE_SUCCESS, payload: await r.json() });
  dispatch(listHV()); // 简单刷新
};
