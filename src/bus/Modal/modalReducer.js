import { OPEN_MODAL, CLOSE_MODAL } from '../types';

export const modalReducer = (state, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isOpened: true,
        modalId: action.payload,
      };
    case CLOSE_MODAL:
      return {
        isOpened: false,
        modalId: null,
      };
    default:
      return state;
  }
};
