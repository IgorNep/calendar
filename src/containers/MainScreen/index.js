import React, { useEffect, useContext, useState } from 'react';
import { AlertContext } from 'bus/alert/alertContext';
import { EventsContext } from 'bus/events/eventsContext';
import Table from 'components/Table';
import { AuthContext } from 'bus/auth/authContext';
import { ModalContext } from 'bus/Modal/modalContext';
import ConfirmModal from 'components/EventComponent/ConfirmModal';

const MainScreen = () => {
  const { showAlert } = useContext(AlertContext);
  const {
    getEvents,
    events,
    updateEvent,
    loading,
    filteredEvents,
  } = useContext(EventsContext);
  const { isAdmin } = useContext(AuthContext);
  const { openModal, isOpened, modalId } = useContext(ModalContext);
  const [event, setEvent] = useState({});
  const eventDeleteHandler = (eventItem) => {
    setEvent(eventItem);
    openModal(eventItem.id);
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      <Table
        params={{
          events,
          updateEvent,
          loading,
          showAlert,
          filteredEvents,
          isAdmin,
          eventDeleteHandler,
        }}
      />
      {isOpened && modalId === event.id && <ConfirmModal event={event} />}
    </>
  );
};

export default MainScreen;
