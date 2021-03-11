import React, { useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { apiService } from 'utils/services/api';
import { EVENTS } from 'utils/services/endpoints';
import TransformData from 'utils/helpers/transformData';
import { AlertContext } from 'bus/alert/alertContext';
import {
  ADD_EVENT,
  EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  EVENTS_FAIL,
  DELETE_EVENT,
  UPDATE_EVENT,
  FILTER_EVENTS,
  FILTER_CLEAR,
} from '../types';
import { eventsReducer } from './eventsReducer';
import { EventsContext } from './eventsContext';

export const EventState = ({ children }) => {
  const initialState = {
    events: null,
    filteredEvents: null,
    loading: false,
    error: null,
  };

  const { showAlert } = useContext(AlertContext);
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  const addEvent = async (event) => {
    dispatch({ type: EVENTS_REQUEST });
    try {
      const res = TransformData.transformSingleItemToMeeting(
        await apiService.addData(EVENTS, event),
      );
      showAlert({ message: 'Events well added!', type: 'success' });
      dispatch({ type: ADD_EVENT, payload: res });
    } catch (error) {
      dispatch({ type: EVENTS_FAIL, payload: error });
    }
  };

  const getEvents = async () => {
    dispatch({ type: EVENTS_REQUEST });
    try {
      const res = TransformData.transformDataToMeeting(
        await apiService.getData(EVENTS),
      );
      showAlert({ message: 'Events well recieved!', type: 'success' });
      dispatch({ type: GET_EVENTS_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: EVENTS_FAIL, payload: error });
    }
  };

  const deleteEvent = async (event) => {
    dispatch({ type: EVENTS_REQUEST });
    try {
      await apiService.removeData(EVENTS, event);

      dispatch({ type: DELETE_EVENT, payload: event });
      showAlert({ message: 'Events well deleted!', type: 'success' });
    } catch (error) {
      dispatch({ type: EVENTS_FAIL, payload: error });
    }
  };

  const updateEvent = async (event) => {
    dispatch({ type: EVENTS_REQUEST });
    try {
      const res = TransformData.transformSingleItemToMeeting(
        await apiService.updateData(EVENTS, event),
      );
      dispatch({ type: UPDATE_EVENT, payload: res });

      showAlert({ message: 'Events well updated!', type: 'success' });
    } catch (error) {
      dispatch({ type: EVENTS_FAIL, payload: error });
    }
  };
  const filterEvents = (user) => {
    dispatch({ type: FILTER_EVENTS, payload: user });
  };
  const clearFilteredEvents = () => {
    dispatch({ type: FILTER_CLEAR });
  };

  const { events, loading, filteredEvents } = state;
  return (
    <EventsContext.Provider
      value={{
        addEvent,
        getEvents,
        deleteEvent,
        updateEvent,
        filterEvents,
        clearFilteredEvents,
        events,
        filteredEvents,
        loading,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

EventState.propTypes = {
  children: PropTypes.node.isRequired,
};
