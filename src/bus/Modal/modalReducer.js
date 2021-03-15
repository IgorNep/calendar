import { OPEN_MODAL, CLOSE_MODAL } from './modalTypes';

const initialState = {
  isOpened: false,
  modalId: null,
};
export const modalReducer = (state = initialState, action) => {
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
