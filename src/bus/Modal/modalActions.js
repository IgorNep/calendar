import { OPEN_MODAL, CLOSE_MODAL } from './modalTypes';

export const openModal = (id) => (dispatch) => {
  dispatch({ type: OPEN_MODAL, payload: id });
};
export const closeModal = () => (dispatch) => {
  dispatch({ type: CLOSE_MODAL });
};
