// client/src/redux/actions/userActions.js
import { USER_LOGIN, USER_LOGOUT } from '../constants/userConstants';
export const login  = (name) => ({ type: USER_LOGIN,  payload: { name } });
export const logout = ()      => ({ type: USER_LOGOUT });
