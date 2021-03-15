import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import ConfirmModal from 'components/EventComponent/ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, updateEvent } from 'bus/events/eventsActions';
import {
  eventsSelector,
  filteredEventsSelector,
  loadingSelector,
} from 'bus/events/eventsSelectors';
import { isAdminSelector } from 'bus/auth/authSelectors';
import { showAlert } from 'bus/alert/alertActions';
import { openModal } from 'bus/Modal/modalActions';
import { isOpenedSelector, modalIdSelector } from 'bus/Modal/modalSelectors';

const MainScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const events = useSelector(eventsSelector);
  const filteredEvents = useSelector(filteredEventsSelector);
  const isAdmin = useSelector(isAdminSelector);
  const isOpened = useSelector(isOpenedSelector);
  const modalId = useSelector(modalIdSelector);

  const [event, setEvent] = useState({});
  const eventDeleteHandler = (eventItem) => {
    setEvent(eventItem);
    dispatch(openModal(eventItem.id));
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
