import { SHOW_ALERT, HIDE_ALERT } from './alertTypes';

export const alertReducer = (state = null, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return action.payload;
    case HIDE_ALERT:
      return null;
    default:
      return state;
  }
};
