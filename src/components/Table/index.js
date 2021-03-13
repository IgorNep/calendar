/* eslint-disable react/jsx-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import EventComponent from 'components/EventComponent';
import { days, time } from 'utils/dataStore';
import Loader from 'components/common/Loader';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableCell from './TableCell';

const Table = ({
  params: {
    events,
    updateEvent,
    loading,
    filteredEvents,
    isAdmin,
    eventDeleteHandler,
    showAlert,
  },
}) => {
  const alertHandler = (message) => {
    showAlert({ message, type: 'danger' });
  };
  const [eventsData, setEventsData] = useState([]);
  const eventsToRender = filteredEvents || events;

  useEffect(() => {
    setEventsData(eventsToRender);
  }, [events, filteredEvents]);

  const dragHandler = (item, monitor, fieldId) => {
    setEventsData((prevState) =>
      prevState.map((event) => {
        const findEvent = eventsData.find(
          (eventItem) => eventItem.fieldId === item.fieldId,
        );
        if (findEvent) {
          findEvent.fieldId = fieldId;
        }
        // eslint-disable-next-line no-unused-expressions
        findEvent && updateEvent(findEvent);
        return {
          ...event,
          event: event.fieldId === item.fieldId ? findEvent : event,
        };
      }),
    );
  };
  return loading ? (
    <Loader />
  ) : (
    eventsData && (
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
                    key={Math.random() * 100}
                    fieldId={`${dayItem}${hour.substring(0, 2)}`}
                    dragHandler={dragHandler}
                    events={eventsData}
                    globalEvents={events}
                    isAdmin={isAdmin}
                  >
                    {eventsData.map((event) => {
                      if (
                        event.fieldId === `${dayItem}${hour.substring(0, 2)}`
                      ) {
                        return (
                          <EventComponent
                            event={event}
                            key={event.fieldId}
                            isAdmin={isAdmin}
                            eventDeleteHandler={eventDeleteHandler}
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
