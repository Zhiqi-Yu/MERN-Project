import {
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL,
  LIST_PRODUCTS_REQUEST, LIST_PRODUCTS_SUCCESS, LIST_PRODUCTS_FAIL
} from '../constants/productConstants';

const addInit = { loading:false, success:false, error:null, product:null };
export function productAddReducer(state = addInit, action) {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST: return { ...state, loading:true, success:false, error:null };
    case ADD_PRODUCT_SUCCESS: return { ...state, loading:false, success:true, product:action.payload };
    case ADD_PRODUCT_FAIL:    return { ...state, loading:false, error:action.payload };
    default: return state;
  }
}

const listInit = { loading:false, error:null, items:[] };
export function productListReducer(state = listInit, action) {
  switch (action.type) {
    case LIST_PRODUCTS_REQUEST: return { ...state, loading:true, error:null };
    case LIST_PRODUCTS_SUCCESS: return { ...state, loading:false, items:action.payload };
    case LIST_PRODUCTS_FAIL:    return { ...state, loading:false, error:action.payload };
    default: return state;
  }
}
