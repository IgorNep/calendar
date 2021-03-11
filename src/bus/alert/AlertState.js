import React, { useReducer } from 'react';
import { HIDE_ALERT, SHOW_ALERT } from 'bus/types';
import PropTypes from 'prop-types';
import { AlertContext } from './alertContext';
import { alertReducer } from './alertReducer';

export const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, null);

  const hideAlert = () => dispatch({ type: HIDE_ALERT });
  const showAlert = (alert, ms = 2000) => {
    dispatch({ type: SHOW_ALERT, payload: alert });

    setTimeout(() => {
      hideAlert();
    }, ms);
  };
  return (
    <AlertContext.Provider value={{ hideAlert, showAlert, alert: state }}>
      {children}
    </AlertContext.Provider>
  );
};

AlertState.propTypes = {
  children: PropTypes.node.isRequired,
};
