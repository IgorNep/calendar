/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDrop } from 'react-dnd';
import { EVENT } from 'utils/helpers/types';

const TableCell = ({
  children,
  dragHandler,
  fieldMeta,
  //   fieldId,
  isAdmin,
  globalEvents,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: EVENT,
    canDrop: () => {
      const findEvent = globalEvents.find(
        (event) => event.fieldId === fieldMeta.fieldId,
      );

      return !findEvent && isAdmin;
    },
    drop: (item, monitor) => {
      dragHandler(item, monitor, fieldMeta);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <td
      ref={drop}
      style={isOver ? { background: 'yellow' } : { background: '#fff' }}
    >
      {children}
    </td>
  );
};

export default TableCell;
