import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, EMPTY_CART, ADD_COUPON } from '../constants/actionTypes';
import { CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAIL } from '../constants/cartCheckoutConstants';

const init = {
  items: [],
  coupon: null,
  checkout: { loading:false, error:null, success:false, message:null, lastOrderId:null, total:0 }
};

export default function cartReducer(state = init, action) {     
  switch (action.type) {

    case ADD_ITEM: {
      const it = action.payload; // {productId,name,price,qty,category}
      const exist = state.items.find(x => x.productId === it.productId);
      const items = exist
        ? state.items.map(x => x.productId===it.productId ? { ...x, qty: x.qty + (it.qty || 1) } : x)
        : [ ...state.items, { ...it, qty: it.qty || 1 } ];
      return { ...state, items };
    }

    case UPDATE_ITEM: {
      const { productId, qty } = action.payload;
      return { ...state, items: state.items.map(x => x.productId===productId ? { ...x, qty } : x) };
    }

    case REMOVE_ITEM:
      return { ...state, items: state.items.filter(x => x.productId !== action.payload) };

    case EMPTY_CART:
      return { ...state, items: [] };                             

    case ADD_COUPON:
      return { ...state, coupon: action.payload };

    case CHECKOUT_REQUEST:
      return { ...state, checkout: { loading:true, error:null, success:false, message:null, lastOrderId:null, total:0 } };

    case CHECKOUT_SUCCESS:
      return {
        ...state,
        checkout: {
          loading:false,
          error:null,
          success:true,
          message: action.payload.message || 'Checkout successfully!',
          lastOrderId: action.payload.cartId || null,
          total: action.payload.total ?? 0
        }
      };

    case CHECKOUT_FAIL:
      return { ...state, checkout: { loading:false, error:action.payload, success:false, message:null, lastOrderId:null, total:0 } };

    default:
      return state;   
  }
}
