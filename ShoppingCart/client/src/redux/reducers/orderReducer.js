import {
  ORDERS_LIST_REQUEST, ORDERS_LIST_SUCCESS, ORDERS_LIST_FAIL,
  ORDERS_CANCEL_REQUEST, ORDERS_CANCEL_SUCCESS, ORDERS_CANCEL_FAIL,
} from '../constants/orderConstants';

const init = { loading: false, error: null, items: [] };

export default function ordersReducer(state = init, action) {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case ORDERS_LIST_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };
    case ORDERS_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ORDERS_CANCEL_REQUEST:
      // 可选：本地乐观更新，先把该订单标为不可取消（省略也行）
      return state;

    case ORDERS_CANCEL_SUCCESS:
      // 成功后从列表中把该订单状态更新为 CANCELLED
      return {
        ...state,
        items: state.items.map(o =>
          String(o._id) === String(action.payload)
            ? { ...o, status: 'CANCELLED', isCancelable: false, computedStatus: 'CANCELLED' }
            : o
        )
      };

    case ORDERS_CANCEL_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
