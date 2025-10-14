import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { pushStaticOnce } from '../redux/actions/notificationActions';

/**
 * 页面挂载时发一条「只出现一次」的静态通知
 * @param {string} key   全局唯一 key，防重复
 * @param {string} msg   文案
 * @param {string|object} link  点击跳转
 */
export default function useStaticHint(key, msg, link) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pushStaticOnce(key, { message: msg, link, type: 'static' }));
  }, [dispatch, key, msg, link]);
}
