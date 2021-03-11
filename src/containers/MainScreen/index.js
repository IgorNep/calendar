import React, { useEffect, useContext } from 'react';
import { AlertContext } from 'bus/alert/alertContext';
import { EventsContext } from 'bus/events/eventsContext';
import Table from 'components/Table';

const MainScreen = () => {
  const { showAlert } = useContext(AlertContext);
  const {
    getEvents,
    events,
    updateEvent,
    loading,
    filteredEvents,
  } = useContext(EventsContext);

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
        }}
      />
    </>
  );
};

export default MainScreen;
