import {
  USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
  USER_SET_CURRENT, USER_CLEAR_CURRENT
} from "../constants/userConstants";

const LS_KEY = "vs_current_user";

export const loadUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    dispatch({ type: USER_LIST_SUCCESS, payload: data });

    // 如果本地没有已选用户，自动选第一个 admin 或第一个用户
    const saved = localStorage.getItem(LS_KEY);
    if (!saved && data.length > 0) {
      const preferred = data.find(u => u.role === "admin") || data[0];
      dispatch(setCurrentUser(preferred));
    }
  } catch (e) {
    dispatch({ type: USER_LIST_FAIL, payload: e.message || "Load users failed" });
  }
};

export const setCurrentUser = (user) => (dispatch) => {
  localStorage.setItem(LS_KEY, JSON.stringify(user));
  dispatch({ type: USER_SET_CURRENT, payload: user });
};

export const restoreCurrentUser = () => (dispatch) => {
  const saved = localStorage.getItem(LS_KEY);
  if (saved) {
    dispatch({ type: USER_SET_CURRENT, payload: JSON.parse(saved) });
  }
};

export const clearCurrentUser = () => (dispatch) => {
  localStorage.removeItem(LS_KEY);
  dispatch({ type: USER_CLEAR_CURRENT });
};
