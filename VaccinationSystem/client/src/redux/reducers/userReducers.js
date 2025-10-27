import {
  USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
  USER_SET_CURRENT, USER_CLEAR_CURRENT
} from "../constants/userConstants";

export const userListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST: return { loading: true, items: [] };
    case USER_LIST_SUCCESS: return { loading: false, items: action.payload };
    case USER_LIST_FAIL:    return { loading: false, items: [], error: action.payload };
    default: return state;
  }
};

export const currentUserReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_SET_CURRENT:   return { user: action.payload };
    case USER_CLEAR_CURRENT: return { user: null };
    default: return state;
  }
};
