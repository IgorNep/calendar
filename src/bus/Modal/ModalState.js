import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from './modalContext';
import { modalReducer } from './modalReducer';
import { CLOSE_MODAL, OPEN_MODAL } from '../types';

export const ModalState = ({ children }) => {
  const initialState = {
    isOpened: false,
    modalId: null,
  };
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const { isOpened, modalId } = state;
  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpened, modalId }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalState.propTypes = {
  children: PropTypes.node.isRequired,
};
