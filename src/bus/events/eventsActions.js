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
} from './eventsTypes';

export const addEvent = (event) => async (dispatch) => {
  dispatch({ type: EVENTS_REQUEST });
  try {
    const res = TransformData.transformSingleItemToMeeting(
      await apiService.addData(EVENTS, event),
    );
    // showAlert({ message: 'Events well added!', type: 'success' });
    dispatch({ type: ADD_EVENT, payload: res });
  } catch (error) {
    dispatch({ type: EVENTS_FAIL, payload: error });
  }
};

export const getEvents = () => async (dispatch) => {
  dispatch({ type: EVENTS_REQUEST });
  try {
    const res = TransformData.transformDataToMeeting(
      await apiService.getData(EVENTS),
    );
    // showAlert({ message: 'Events well recieved!', type: 'success' });
    dispatch({ type: GET_EVENTS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: EVENTS_FAIL, payload: error });
  }
};

export const deleteEvent = (event) => async (dispatch) => {
  dispatch({ type: EVENTS_REQUEST });
  try {
    await apiService.removeData(EVENTS, event);

    dispatch({ type: DELETE_EVENT, payload: event });
    // showAlert({ message: 'Events well deleted!', type: 'success' });
  } catch (error) {
    dispatch({ type: EVENTS_FAIL, payload: error });
  }
};

export const updateEvent = (event) => async (dispatch) => {
  dispatch({ type: EVENTS_REQUEST });
  try {
    const res = TransformData.transformSingleItemToMeeting(
      await apiService.updateData(EVENTS, event),
    );
    dispatch({ type: UPDATE_EVENT, payload: res });

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
