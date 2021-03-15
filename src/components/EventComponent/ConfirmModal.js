/* eslint-disable react/prop-types */
import Button from 'components/common/Button';
import Portal from 'components/common/Portal';
import WrapperForModal from 'components/common/WrapperForModal';
import React from 'react';
import { deleteEvent } from 'bus/events/eventsActions';
import { useDispatch } from 'react-redux';
import { closeModal } from 'bus/Modal/modalActions';
import styles from './styles.module.scss';

const ConfirmModal = ({ event }) => {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(deleteEvent(event));
    dispatch(closeModal());
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
              onClick={() => dispatch(closeModal())}
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
