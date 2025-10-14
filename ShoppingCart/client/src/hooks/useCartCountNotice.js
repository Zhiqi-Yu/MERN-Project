import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upsertSpecial, removeSpecial } from '../redux/actions/notificationActions';

export default function useCartCountNotice() {
  const dispatch = useDispatch();
  const items = useSelector(s => s.cart?.items || []);

  useEffect(() => {
    const count = items.reduce((s, it) => s + Number(it.qty || 0), 0);

    if (count > 0) {
      dispatch(upsertSpecial('CART_COUNT', {
        type: 'dynamic',
        message: `You have ${count} item${count > 1 ? 's' : ''} in the cart`,
        link: '/cart',    // 你也可以改成 '/checkout'
      }));
    } else {
      // 购物车空了就把这条动态通知移除
      dispatch(removeSpecial('CART_COUNT'));
    }
  }, [dispatch, items]);
}
