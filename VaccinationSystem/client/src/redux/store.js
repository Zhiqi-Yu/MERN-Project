import { configureStore, combineReducers } from '@reduxjs/toolkit';
import rootReducer from "./reducers";

export default configureStore({ reducer: rootReducer, devTools: true });