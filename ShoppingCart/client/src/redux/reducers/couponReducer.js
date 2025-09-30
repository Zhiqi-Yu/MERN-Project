import { ADD_COUPON } from '../constants/actionTypes';

const init = { value: null, percent: 0 };

export default function couponReducer(state = init, action) {
  switch (action.type) {
    case ADD_COUPON:
      // payload: { code:'123456', percent: 20 }
      return { ...state, value: action.payload.code, percent: action.payload.percent };
    default:
      return state;
  }
}
