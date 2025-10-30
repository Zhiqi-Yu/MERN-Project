import {
  HOSPITAL_LIST_REQUEST, HOSPITAL_LIST_SUCCESS, HOSPITAL_LIST_FAIL, HOSPITAL_LIST_CLEAR,
  HOSPITAL_VACCINES_REQUEST, HOSPITAL_VACCINES_SUCCESS, HOSPITAL_VACCINES_FAIL
} from "../constants/hospitalConstants";

export const hospitalListReducer = (state = { loading: false, items: [] }, action) => {
  switch (action.type) {
    case HOSPITAL_LIST_REQUEST: return { ...state, loading: true, error: null };
    case HOSPITAL_LIST_SUCCESS: return { loading: false, items: action.payload };
    case HOSPITAL_LIST_FAIL:    return { loading: false, items: [], error: action.payload };
    case HOSPITAL_LIST_CLEAR:   return { loading: false, items: [] };
    default: return state;
  }
};

export const hospitalVaccinesReducer = (state = { loading: false, items: [] }, action) => {
  switch (action.type) {
    case HOSPITAL_VACCINES_REQUEST: return { ...state, loading: true, error: null };
    case HOSPITAL_VACCINES_SUCCESS: return { loading: false, items: action.payload };
    case HOSPITAL_VACCINES_FAIL:    return { loading: false, items: [], error: action.payload };
    default: return state;
  }
};
