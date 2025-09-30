import { ADD_COUPON } from '../constants/actionTypes';

const FIXED_PERCENT = 20; // 想固定几折就写几（20=打8折）

export const generateCoupon = (mode = 'random') => (dispatch) => {
  const code = String(Math.floor(100000 + Math.random() * 900000)); // 6位数字
  const percent = mode === 'fixed'
    ? FIXED_PERCENT
    : Math.floor(10 + Math.random() * 21); // 10%~30% 之间随机整数

  dispatch({ type: ADD_COUPON, payload: { code, percent } });
};
