import {
  APPOINTMENT_CREATE_REQUEST, APPOINTMENT_CREATE_SUCCESS, APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_LIST_REQUEST,   APPOINTMENT_LIST_SUCCESS,   APPOINTMENT_LIST_FAIL
} from "../constants/appointmentConstants";

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST: return { loading: true };
    case APPOINTMENT_CREATE_SUCCESS: return { loading: false, item: action.payload };
    case APPOINTMENT_CREATE_FAIL:    return { loading: false, error: action.payload };
    default: return state;
  }
};

export const appointmentListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST: return { loading: true, items: [] };
    case APPOINTMENT_LIST_SUCCESS: return { loading: false, items: action.payload };
    case APPOINTMENT_LIST_FAIL:    return { loading: false, items: [], error: action.payload };
    default: return state;
  }
};
