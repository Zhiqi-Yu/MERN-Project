// redux/reducers/notificationReducer.js
import {
  NOTIF_PUSH, NOTIF_UPSERT_SPECIAL, NOTIF_MARK_READ, NOTIF_MARK_ALL,
  NOTIF_REMOVE, NOTIF_TOGGLE, NOTIF_REMOVE_SPECIAL,
} from '../actions/notificationActions';

const initial = {
  open: false,
  list: [],           // {id, type, message, link, read, createdAt, onceKey?, specialId?}
  seenOnce: {}        // 记录 onceKey 已经发过
};

export function notificationReducer(state = initial, action) {
  switch (action.type) {
    case NOTIF_PUSH: {
      const n = action.payload;
      // onceKey 去重
      if (n.onceKey && state.seenOnce[n.onceKey]) return state;
      return {
        ...state,
        list: [n, ...state.list],
        seenOnce: n.onceKey ? { ...state.seenOnce, [n.onceKey]: true } : state.seenOnce
      };
    }
    case NOTIF_UPSERT_SPECIAL: {
      const { specialId, data } = action.payload;
      // 查找是否已存在相同 specialId
      const idx = state.list.findIndex(x => x.specialId === specialId);
      if (idx >= 0) {
        const next = [...state.list];
        next[idx] = { ...next[idx], ...data, specialId, read: false }; // 更新为未读
        return { ...state, list: next };
      }
      return { ...state, list: [{ ...data, specialId }, ...state.list] };
    }
    case NOTIF_MARK_READ: {
      const next = state.list.map(n => n.id === action.id ? { ...n, read: true } : n);
      return { ...state, list: next };
    }
    case NOTIF_MARK_ALL: {
      const next = state.list.map(n => ({ ...n, read: true }));
      return { ...state, list: next };
    }
    case NOTIF_REMOVE: {
      return { ...state, list: state.list.filter(n => n.id !== action.id) };
    }
    case NOTIF_TOGGLE:
      return { ...state, open: !state.open };
    case NOTIF_REMOVE_SPECIAL: {
      return { ...state, list: state.list.filter(n => n.specialId !== action.specialId) };
    }

    default:
      return state;
  }
}
