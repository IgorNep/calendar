import React, { useReducer } from 'react';
import { apiService } from 'utils/services/api';
import { USERS } from 'utils/services/endpoints';
import TransformData from 'utils/helpers/transformData';
import PropTypes from 'prop-types';
import { UsersContext } from './usersContext';
import { GET_USERS_FAIL, GET_USERS_REQUEST, GET_USERS_SUCCESS } from '../types';
import { usersReducer } from './usersReducer';

export const UsersState = ({ children }) => {
  const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const getUsers = async () => {
    dispatch({ type: GET_USERS_REQUEST });
    try {
      const res = TransformData.transformDataToMeeting(
        await apiService.getData(USERS),
      );
      dispatch({ type: GET_USERS_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: GET_USERS_FAIL, payload: error });
    }
  };
  const { users, loading, error } = state;
  return (
    <UsersContext.Provider value={{ getUsers, users, loading, error }}>
      {children}
    </UsersContext.Provider>
  );
};

UsersState.propTypes = {
  children: PropTypes.node.isRequired,
};
