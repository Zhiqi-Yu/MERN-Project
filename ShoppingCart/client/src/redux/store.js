// client/src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { productAddReducer, productListReducer } from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import couponReducer from './reducers/couponReducer';          // ★ new
import userReducer from './reducers/userReducer';               // ★ needed in Part B below
import ordersReducer from './reducers/orderReducer';
import { notificationReducer } from './reducers/notificationReducer';


const rootReducer = combineReducers({
  productAdd:  productAddReducer,
  productList: productListReducer,
  cart:        cartReducer,
  coupon:      couponReducer,     // ★
  user:        userReducer,       // ★
  orders: ordersReducer, 
  notifications: notificationReducer,
});

export default configureStore({ reducer: rootReducer, devTools: true });
