// client/src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { productAddReducer, productListReducer } from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import couponReducer from './reducers/couponReducer';          // ★ new
import userReducer from './reducers/userReducer';               // ★ needed in Part B below

const rootReducer = combineReducers({
  productAdd:  productAddReducer,
  productList: productListReducer,
  cart:        cartReducer,
  coupon:      couponReducer,     // ★
  user:        userReducer,       // ★
});

export default configureStore({ reducer: rootReducer, devTools: true });
