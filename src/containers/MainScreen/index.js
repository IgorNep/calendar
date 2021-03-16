/* eslint-disable no-unused-expressions */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import ConfirmModal from 'components/EventComponent/ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEvents,
  updateEvent,
  setCurrentEvent,
} from 'bus/events/eventsActions';
import {
  eventsSelector,
  filteredEventsSelector,
  loadingSelector,
  successSelector,
} from 'bus/events/eventsSelectors';
import {
  isAdminSelector,
  // userSelector
} from 'bus/auth/authSelectors';
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
  const success = useSelector(successSelector);

  const [event, setEvent] = useState({});
  const eventDeleteHandler = (eventItem) => {
    setEvent(eventItem);
    dispatch(openModal(eventItem.id));
  };
  const eventEditHandler = (eventItem) => {
    dispatch(setCurrentEvent(eventItem));
    setEvent(eventItem);
    dispatch(openModal('js-edit-modal'));
  };

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(showAlert({ message: success, type: 'success' }));
    }
  }, [success]);

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
          eventEditHandler,
        }}
      />
      {isOpened && modalId === event.id && <ConfirmModal event={event} />}
    </>
  );
};

export default MainScreen;
