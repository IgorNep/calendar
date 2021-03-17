/* eslint-disable react/jsx-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import EventComponent from 'components/EventComponent';
import { days, time } from 'utils/dataStore';
import Loader from 'components/common/Loader';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { successSelector } from 'bus/events/eventsSelectors';
import { fieldIdMaker } from 'utils/helpers/fieldIdMaker';
import TableCell from './TableCell';

const Table = ({
  params: {
    events,
    updateEvent,
    loading,
    filteredEvents,
    isAdmin,
    eventDeleteHandler,
    eventEditHandler,
    showAlert,
  },
}) => {
  const dispatch = useDispatch();
  const success = useSelector(successSelector);
  const alertHandler = (message) => {
    dispatch(showAlert({ message, type: 'danger' }));
  };
  const eventsToRender = filteredEvents || events;

  const dragHandler = (item, monitor, fieldMeta) => {
    const findEvent = events.find(
      (eventItem) => eventItem.fieldId === item.fieldId,
    );
    if (findEvent) {
      findEvent.fieldId = fieldMeta.fieldId;
      findEvent.time = fieldMeta.time;
      findEvent.day = fieldMeta.day;
    }
    // eslint-disable-next-line no-unused-expressions
    findEvent && dispatch(updateEvent(findEvent));
  };

  useEffect(() => {
    if (success) {
      dispatch(showAlert({ message: success.message, type: 'success' }));
    }
  }, [success]);

  return loading ? (
    <Loader />
  ) : (
    eventsToRender && (
      <DndProvider backend={HTML5Backend}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Time</th>
              {days.map((day) => (
                <th scope="col" key={day}>
                  {day.substr(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {time.map((hour) => (
              <tr key={hour}>
                <td>{hour}</td>
                {days.map((dayItem) => (
                  <TableCell
                    key={fieldIdMaker(dayItem, hour)}
                    fieldMeta={{
                      fieldId: fieldIdMaker(dayItem, hour),
                      time: hour,
                      day: dayItem,
                    }}
                    dragHandler={dragHandler}
                    events={eventsToRender}
                    globalEvents={events}
                    isAdmin={isAdmin}
                  >
                    {eventsToRender.map((event) => {
                      if (event.fieldId === fieldIdMaker(dayItem, hour)) {
                        return (
                          <EventComponent
                            event={event}
                            key={event.fieldId}
                            isAdmin={isAdmin}
                            eventDeleteHandler={eventDeleteHandler}
                            eventEditHandler={eventEditHandler}
                            alertHandler={alertHandler}
                          />
                        );
                      }
                      return null;
                    })}
                  </TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DndProvider>
    )
  );
};

export default Table;
