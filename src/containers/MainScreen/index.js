import React, { useEffect, useContext, useState } from 'react';
import { AlertContext } from 'bus/alert/alertContext';
import Table from 'components/Table';
import { AuthContext } from 'bus/auth/authContext';
import { ModalContext } from 'bus/Modal/modalContext';
import ConfirmModal from 'components/EventComponent/ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, updateEvent } from 'bus/events/eventsActions';
import {
  eventsSelector,
  filteredEventsSelector,
  loadingSelector,
} from 'bus/events/eventsSelectors';

const MainScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const events = useSelector(eventsSelector);
  const filteredEvents = useSelector(filteredEventsSelector);

  const { showAlert } = useContext(AlertContext);
  const { isAdmin } = useContext(AuthContext);
  const { openModal, isOpened, modalId } = useContext(ModalContext);
  const [event, setEvent] = useState({});
  const eventDeleteHandler = (eventItem) => {
    setEvent(eventItem);
    openModal(eventItem.id);
  };

  useEffect(() => {
    dispatch(getEvents());
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
