// redux/actions/notificationActions.js
export const NOTIF_PUSH = 'NOTIF_PUSH';
export const NOTIF_UPSERT_SPECIAL = 'NOTIF_UPSERT_SPECIAL';
export const NOTIF_MARK_READ = 'NOTIF_MARK_READ';
export const NOTIF_MARK_ALL = 'NOTIF_MARK_ALL';
export const NOTIF_REMOVE = 'NOTIF_REMOVE';
export const NOTIF_TOGGLE = 'NOTIF_TOGGLE';
export const NOTIF_REMOVE_SPECIAL = 'NOTIF_REMOVE_SPECIAL';


const makeId = () => `${Date.now()}_${Math.random().toString(36).slice(2,8)}`;

/**
 * 通用新增一条通知
 * payload: { type:'static'|'dynamic', message:string, link:string|{pathname,search,hash}, onceKey?:string, specialId?:string }
 */
export const pushNotification = (payload) => ({
  type: NOTIF_PUSH,
  payload: { id: makeId(), read: false, createdAt: Date.now(), ...payload }
});

/** 同一个 onceKey 仅添加一次（静态提示防重复） */
export const pushStaticOnce = (onceKey, payload) =>
  pushNotification({ ...payload, type: 'static', onceKey });

/** upsert 特殊通知（如 购物车数量），用 specialId 定位并更新 */
export const upsertSpecial = (specialId, payload) => ({
  type: NOTIF_UPSERT_SPECIAL,
  payload: { specialId, data: { id: makeId(), read: false, createdAt: Date.now(), ...payload } }
});

export const markRead = (id) => ({ type: NOTIF_MARK_READ, id });
export const markAllRead = () => ({ type: NOTIF_MARK_ALL });
export const removeNotification = (id) => ({ type: NOTIF_REMOVE, id });
export const toggleNotifications = () => ({ type: NOTIF_TOGGLE });
export const removeSpecial = (specialId) => ({ type: NOTIF_REMOVE_SPECIAL, specialId });