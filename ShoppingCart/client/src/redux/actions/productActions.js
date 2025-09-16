import axios from 'axios';
import {
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL,
  LIST_PRODUCTS_REQUEST, LIST_PRODUCTS_SUCCESS, LIST_PRODUCTS_FAIL
} from '../constants/productConstants';

// ❌ 删掉 baseURL 直连的写法
// const api = axios.create({ baseURL: 'http://localhost:5000' });

export const addProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    const { data } = await axios.post('/api/products', product);   // 相对路径
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADD_PRODUCT_FAIL, payload: err?.response?.data?.message || err.message });
  }
};

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_PRODUCTS_REQUEST });
    const { data } = await axios.get('/api/products');             // 相对路径
    dispatch({ type: LIST_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: LIST_PRODUCTS_FAIL, payload: err?.response?.data?.message || err.message });
  }
};
