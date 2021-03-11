/* eslint-disable react/prop-types */
import { EventsContext } from 'bus/events/eventsContext';
import { ModalContext } from 'bus/Modal/modalContext';
import Button from 'components/common/Button';
import Portal from 'components/common/Portal';
import WrapperForModal from 'components/common/WrapperForModal';
import React, { useContext } from 'react';
import styles from './styles.module.scss';

const ConfirmModal = ({ event }) => {
  const { closeModal } = useContext(ModalContext);
  const { deleteEvent } = useContext(EventsContext);
  const submitHandler = (e) => {
    e.preventDefault();
    deleteEvent(event);
    closeModal();
  };
  return (
    <Portal>
      <WrapperForModal>
        <form>
          <h3>
            Are you sure you want to delete &quot;
            {event.title}
            &quot; event?
          </h3>
          <div className={styles.buttonsGroup}>
            <Button
              title="Cancel"
              type="button"
              onClick={closeModal}
              className="btn btn-secondary"
            />
            <Button
              title="Yes"
              type="submit"
              onClick={submitHandler}
              className="btn btn-primary"
            />
          </div>
        </form>
      </WrapperForModal>
    </Portal>
  );
};

export default ConfirmModal;
