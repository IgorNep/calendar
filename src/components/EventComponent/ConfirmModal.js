/* eslint-disable react/prop-types */
import { ModalContext } from 'bus/Modal/modalContext';
import Button from 'components/common/Button';
import Portal from 'components/common/Portal';
import WrapperForModal from 'components/common/WrapperForModal';
import React, { useContext } from 'react';
import { deleteEvent } from 'bus/events/eventsActions';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

const ConfirmModal = ({ event }) => {
  const dispatch = useDispatch();

  const { closeModal } = useContext(ModalContext);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(deleteEvent(event));
    closeModal();
  };
  return (
    <Portal>
      <WrapperForModal title="Are you sure?">
        <form onSubmit={submitHandler}>
          <h5>
            Delete &quot;
            {event.title}
            &quot; event?
          </h5>
          <div className={styles.buttonsGroup}>
            <Button
              title="Cancel"
              type="button"
              onClick={closeModal}
              className="btn btn-secondary"
            />
            <Button title="Yes" type="submit" className="btn btn-primary" />
          </div>
        </form>
      </WrapperForModal>
    </Portal>
  );
};

export default ConfirmModal;
