import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './authContext';
import { AUTH_USER, LOGOUT, SET_AS_ADMIN } from '../types';
import { authReducer } from './authReducer';

export const AuthState = ({ children }) => {
  const initialState = {
    isAuthenticated: localStorage.getItem('user'),
    isAdmin: localStorage.getItem('admin'),
    user: JSON.parse(localStorage.getItem('user')) || null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authUser = (user) => {
    dispatch({ type: AUTH_USER, payload: user });
  };

  const setAsAdmin = () => {
    dispatch({ type: SET_AS_ADMIN });
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const { isAdmin, isAuthenticated, user } = state;
  return (
    <AuthContext.Provider
      value={{ isAdmin, isAuthenticated, user, authUser, setAsAdmin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthState.propTypes = {
  children: PropTypes.node.isRequired,
};
