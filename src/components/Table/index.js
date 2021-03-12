/* eslint-disable react/prop-types */
import React from 'react';
import EventComponent from 'components/EventComponent';
import { days, time } from 'utils/dataStore';
import Loader from 'components/common/Loader';

const Table = ({
  params: { events, updateEvent, loading, showAlert, filteredEvents },
}) => {
  const onDropHandler = (e) => {
    const dropZone = e.target;
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    if (dropZone.dataset.id === id) {
      draggableElement.style.background = 'lightblue';
      return;
    }
    const eventExists = events.find(
      (item) => item.fieldId === dropZone.dataset.id,
    );
    if (eventExists) {
      showAlert({
        message: 'Failed to transfer! Timeslot already reserved!',
        type: 'danger',
      });
      return;
    }
    if (dropZone.children.length > 0) {
      showAlert({
        message: 'Failed to transfer! Timeslot already reserved!',
        type: 'danger',
      });
      draggableElement.style.background = 'lightblue';
      return;
    }
    const findEl = events.find((item) => item.fieldId === id);
    findEl.fieldId = dropZone.dataset.id;
    updateEvent(findEl);
  };
  const eventsToRender = filteredEvents || events;
  return loading ? (
    <Loader />
  ) : (
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
        {time.map((item) => (
          <tr key={item}>
            <th scope="row">{item}</th>
            {days.map((day) => {
              let eventMatch;
              if (eventsToRender) {
                eventMatch = eventsToRender.find(
                  (i) => i.fieldId === `${day}${item.substr(0, 2)}`,
                );
              }

              return (
                <td
                  key={Math.random() * 100}
                  data-id={`${day}${item.substr(0, 2)}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => onDropHandler(e)}
                >
                  {eventMatch && <EventComponent event={eventMatch} />}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
