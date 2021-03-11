import { AUTH_USER, LOGOUT, SET_AS_ADMIN } from 'bus/types';

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_USER:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case SET_AS_ADMIN:
      localStorage.setItem('admin', JSON.stringify(true));
      return {
        ...state,
        isAdmin: true,
      };
    case LOGOUT:
      localStorage.removeItem('user');
      localStorage.removeItem('users');
      localStorage.removeItem('admin', true);
      return {
        isAuthenticated: false,
        isAdmin: false,
      };
    default:
      return state;
  }
};
