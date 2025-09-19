// redux/actions/cartActions.js
import axios from 'axios';
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, EMPTY_CART, ADD_COUPON } from '../constants/actionTypes';
import { CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAIL } from '../constants/cartCheckoutConstants';

export const addItem = (p) => ({ type: ADD_ITEM, payload: p });                // {productId,name,price,qty,category}
export const removeItem = (productId) => ({ type: REMOVE_ITEM, payload: productId });
export const updateItem = (productId, qty) => ({ type: UPDATE_ITEM, payload: { productId, qty } });
export const emptyCart = () => ({ type: EMPTY_CART });
export const addCoupon = (code) => ({ type: ADD_COUPON, payload: code });

export const checkoutCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CHECKOUT_REQUEST });
    const { cart: { items, coupon } } = getState();
    const body = { 
      items: items.map(i => ({ productId: i.productId, name: i.name, price: i.price, qty: i.qty, category: i.category })),
      coupon
    };
    const { data } = await axios.post('/api/carts', body); // proxy → http://127.0.0.1:9000
    dispatch({ type: CHECKOUT_SUCCESS, payload: { ...data, message: 'Checkout successfully!' } });   // {cartId,total,...}
    dispatch({ type: EMPTY_CART});
  } catch (err) {
    const msg = err?.response?.data?.message || err.message || 'Checkout failed';
    dispatch({ type: CHECKOUT_FAIL, payload: msg });
  }
};
