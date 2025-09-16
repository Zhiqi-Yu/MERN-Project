import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { productAddReducer, productListReducer } from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  productAdd:  productAddReducer,
  productList: productListReducer,
  cart:        cartReducer
});

export default configureStore({
  reducer: rootReducer,
  devTools: true
});
