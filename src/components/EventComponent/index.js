/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable operator-linebreak */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDrag } from 'react-dnd';
import { EVENT } from 'utils/helpers/types';
import styles from './styles.module.scss';

const EventComponent = ({
  event,
  isAdmin,
  eventDeleteHandler,
  eventEditHandler,
  alertHandler,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: EVENT,
    item: {
      id: event.id,
      title: event.title,
      fieldId: event.fieldId,
      owner: event.owner,
    },
    end: (item, monitor) => {
      const i = monitor.getDropResult();
      if (i === null) {
        alertHandler('Time slot is reserved!');
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div
      ref={drag}
      style={
        isAdmin
          ? { ...opacity, pointerEvents: true }
          : { ...opacity, pointerEvents: 'none' }
      }
      className={styles.event}
    >
      {event.title}
      {isAdmin && (
        <div>
          <i
            className="fa fa-pencil text-dark "
            onClick={() => eventEditHandler(event)}
          />
          <i
            className="fa fa-times text-danger pl-2"
            onClick={() => eventDeleteHandler(event)}
          />
        </div>
      )}
    </div>
  );
};

export default EventComponent;
