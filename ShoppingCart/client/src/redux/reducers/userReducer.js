// client/src/redux/reducers/userReducer.js
import { USER_LOGIN, USER_LOGOUT } from '../constants/userConstants';
const init = { name: '', isLoggedIn: false };
export default function userReducer(state = init, action) {
  switch (action.type) {
    case USER_LOGIN:  return { name: action.payload.name, isLoggedIn: true };
    case USER_LOGOUT: return { ...init };
    default:          return state;
  }
}
