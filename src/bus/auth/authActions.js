import { AUTH_USER, SET_AS_ADMIN, LOGOUT } from './authTypes';

export const authUser = (user) => (dispatch) => {
  dispatch({ type: AUTH_USER, payload: user });
};

export const setAsAdmin = () => (dispatch) => {
  dispatch({ type: SET_AS_ADMIN });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
