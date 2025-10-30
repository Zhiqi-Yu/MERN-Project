import {
  HV_LIST_REQUEST, HV_LIST_SUCCESS, HV_LIST_FAIL,
  HV_CREATE_REQUEST, HV_CREATE_SUCCESS, HV_CREATE_FAIL,
  HV_UPDATE_REQUEST, HV_UPDATE_SUCCESS, HV_UPDATE_FAIL
} from "../constants/hvConstants";

export const hvListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case HV_LIST_REQUEST:  return { loading: true, items: [] };
    case HV_LIST_SUCCESS:  return { loading: false, items: action.payload };
    case HV_LIST_FAIL:     return { loading: false, items: [], error: action.payload };
    default: return state;
  }
};

export const hvMutateReducer = (state = {}, action) => {
  switch (action.type) {
    case HV_CREATE_REQUEST:
    case HV_UPDATE_REQUEST: return { loading: true };
    case HV_CREATE_SUCCESS:
    case HV_UPDATE_SUCCESS: return { loading: false, ok: true, item: action.payload };
    case HV_CREATE_FAIL:
    case HV_UPDATE_FAIL:    return { loading: false, error: action.payload };
    default: return state;
  }
};
