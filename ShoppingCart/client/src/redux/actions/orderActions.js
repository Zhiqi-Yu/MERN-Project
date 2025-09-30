import axios from 'axios';
import {
  ORDERS_LIST_REQUEST, ORDERS_LIST_SUCCESS, ORDERS_LIST_FAIL,
  ORDERS_CANCEL_REQUEST, ORDERS_CANCEL_SUCCESS, ORDERS_CANCEL_FAIL,
} from '../constants/orderConstants';

// 拉取我的订单
export const fetchMyOrders = (userId) => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_LIST_REQUEST });
    const { data } = await axios.get('/api/orders', { params: { userId } });
    dispatch({ type: ORDERS_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ORDERS_LIST_FAIL, payload: err?.response?.data?.message || err.message });
  }
};

// 取消订单
export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_CANCEL_REQUEST, payload: orderId });
    await axios.patch(`/api/orders/${orderId}/cancel`);
    dispatch({ type: ORDERS_CANCEL_SUCCESS, payload: orderId });
  } catch (err) {
    dispatch({ type: ORDERS_CANCEL_FAIL, payload: err?.response?.data?.message || err.message });
  }
};
