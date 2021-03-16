import { HIDE_ALERT, SHOW_ALERT } from './alertTypes';

const hideAlert = () => (dispatch) => dispatch({ type: HIDE_ALERT });

const showAlert = (alert, ms = 2000) => (dispatch) => {
  dispatch({ type: SHOW_ALERT, payload: alert });

  setTimeout(() => {
    dispatch({ type: HIDE_ALERT });
  }, ms);
};
export { hideAlert, showAlert };
