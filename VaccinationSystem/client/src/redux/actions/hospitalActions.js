import {
  HOSPITAL_LIST_REQUEST, HOSPITAL_LIST_SUCCESS, HOSPITAL_LIST_FAIL, HOSPITAL_LIST_CLEAR,
  HOSPITAL_VACCINES_REQUEST, HOSPITAL_VACCINES_SUCCESS, HOSPITAL_VACCINES_FAIL
} from "../constants/hospitalConstants";

export const listHospitals = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: HOSPITAL_LIST_REQUEST });

    // 兼容误传 { params: {...} } 的情况
    const input = (params && typeof params === "object" && "params" in params)
      ? params.params
      : params;

    // 过滤空值
    const filtered = Object.fromEntries(
      Object.entries(input || {}).filter(([_, v]) =>
        v !== undefined && v !== null && String(v).trim() !== ""
      )
    );

    const qs = new URLSearchParams(filtered).toString();
    const url = qs ? `/api/hospitals?${qs}` : `/api/hospitals`;

    console.log("listHospitals fetch =>", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    dispatch({ type: HOSPITAL_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: HOSPITAL_LIST_FAIL, payload: err.message || "Error" });
  }
};

export const listHospitalVaccines = (hospitalId) => async (dispatch) => {
  try {
    dispatch({ type: HOSPITAL_VACCINES_REQUEST });
    const res = await fetch(`/api/hospitals/${hospitalId}/vaccines`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    dispatch({ type: HOSPITAL_VACCINES_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: HOSPITAL_VACCINES_FAIL, payload: err.message || "Error" });
  }
};

export const clearHospitalList = () => ({ type: HOSPITAL_LIST_CLEAR });
