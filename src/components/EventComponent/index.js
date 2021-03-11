/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import { AuthContext } from 'bus/auth/authContext';
import { ModalContext } from 'bus/Modal/modalContext';
import React, { useContext } from 'react';
import ConfirmModal from './ConfirmModal';
import styles from './styles.module.scss';

const EventComponent = ({ event }) => {
  const { title, fieldId } = event;
  const { isOpened, openModal, modalId } = useContext(ModalContext);
  const { isAdmin } = useContext(AuthContext);
  const onDeleteClick = () => {
    openModal(event.id);
  };
  const dragStartHandler = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.currentTarget.style.backgroundColor = 'yellow';
    e.currentTarget.style.color = 'black';
  };

  return (
    <>
      <span
        className={styles.event}
        onDragStart={(e) => dragStartHandler(e)}
        id={fieldId}
        draggable
        style={isAdmin ? { pointerEvents: true } : { pointerEvents: 'none' }}
      >
        {title}
        {isAdmin && (
          <i
            className="fa fa-times"
            onClick={onDeleteClick}
            style={{ color: 'red', cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={onDeleteClick}
          />
        )}
      </span>
      {isOpened && modalId === event.id && <ConfirmModal event={event} />}
    </>
  );
};

export default EventComponent;
