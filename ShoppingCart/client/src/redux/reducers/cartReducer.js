import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, EMPTY_CART, ADD_COUPON } from '../constants/actionTypes';

const init = { items: [], coupon: null };

export default function cartReducer(state = init, action) {
  switch (action.type) {
    case ADD_ITEM:
      // 示例：{ id, name, price, qty }
      return { ...state, items: [...state.items, action.payload] };
    case REMOVE_ITEM:
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(i => i.id === action.payload.id ? { ...i, ...action.payload } : i)
      };
    case EMPTY_CART:
      return { ...state, items: [] };
    case ADD_COUPON:
      return { ...state, coupon: action.payload };
    default:
      return state;
  }
}
