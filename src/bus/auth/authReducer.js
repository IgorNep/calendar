import { AUTH_USER, LOGOUT, SET_AS_ADMIN } from './authTypes';

const initialState = {
  isAuthenticated: localStorage.getItem('user'),
  isAdmin: localStorage.getItem('admin'),
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export const authReducer = (state = initialState, action) => {
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
        user: null,
      };
    default:
      return state;
  }
};
