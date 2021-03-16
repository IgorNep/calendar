import TransformData from 'utils/helpers/transformData';
import { apiService } from 'utils/services/api';
import { EVENTS } from 'utils/services/endpoints';
import {
  EVENTS_REQUEST,
  EVENTS_FAIL,
  ADD_EVENT,
  GET_EVENTS_SUCCESS,
  DELETE_EVENT,
  UPDATE_EVENT,
  FILTER_CLEAR,
  FILTER_EVENTS,
  SET_CURRENT_EVENT,
  CLEAR_CURRENT_EVENT,
  CLEAR_EVENTS,
} from './eventsTypes';

export const addEvent = (event) => async (dispatch) => {
  dispatch({ type: EVENTS_REQUEST });
  try {
    const result = TransformData.transformSingleItemToMeeting(
      await apiService.addData(EVENTS, event),
    );
    dispatch({
      type: ADD_EVENT,
      payload: { success: 'Event well added!', event: result },
    });
  } catch (error) {
    dispatch({ type: EVENTS_FAIL, payload: error });
  }
};

export const getEvents = () => async (dispatch, getStore) => {
  dispatch({ type: EVENTS_REQUEST });

  const { isAdmin, user } = getStore().auth;
  try {
    const res = TransformData.transformDataToMeeting(
      await apiService.getData(EVENTS),
    );

    let events = [];
    if (!isAdmin) {
      res.forEach((event) => {
        const userOwnEvent = event.owner.find((item) => item === user.name);
        if (userOwnEvent) {
          events.push(event);
        }
      });
    } else {
      events = res;
    }

    dispatch({
      type: GET_EVENTS_SUCCESS,
      payload: { success: 'Events well recieved!', events },
    });
  } catch (error) {
    dispatch({ type: EVENTS_FAIL, payload: error });
  }
};

export const clearEvents = () => (dispatch) => {
  dispatch({ type: CLEAR_EVENTS });
};

export const deleteEvent = (event) => async (dispatch) => {
  dispatch({ type: EVENTS_REQUEST });
  try {
    await apiService.removeData(EVENTS, event);

    dispatch({
      type: DELETE_EVENT,
      payload: { success: 'Event well deleted!', event },
    });
  } catch (error) {
    dispatch({ type: EVENTS_FAIL, payload: error });
  }
};

export const setCurrentEvent = (event) => (dispatch) => {
  dispatch({ type: SET_CURRENT_EVENT, payload: event });
};
export const clearCurrentEvent = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_EVENT });
};

export const updateEvent = (event) => async (dispatch) => {
  dispatch({ type: EVENTS_REQUEST });
  try {
    const result = TransformData.transformSingleItemToMeeting(
      await apiService.updateData(EVENTS, event),
    );
    dispatch({
      type: UPDATE_EVENT,
      payload: { success: 'Event well updated!', event: result },
    });

    // showAlert({ message: 'Events well updated!', type: 'success' });
  } catch (error) {
    dispatch({ type: EVENTS_FAIL, payload: error });
  }
};
export const filterEvents = (user) => (dispatch) => {
  dispatch({ type: FILTER_EVENTS, payload: user });
};
export const clearFilteredEvents = () => (dispatch) => {
  dispatch({ type: FILTER_CLEAR });
};
