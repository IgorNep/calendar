/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import {
  GET_EVENTS_SUCCESS,
  EVENTS_REQUEST,
  EVENTS_FAIL,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FILTER_EVENTS,
  FILTER_CLEAR,
} from '../types';

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case EVENTS_REQUEST:
      return { ...state, loading: true };
    case GET_EVENTS_SUCCESS:
      return { ...state, loading: false, events: action.payload };
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
        loading: false,
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((item) => item.id !== action.payload.id),
        filteredEvents:
          state.filteredEvents &&
          state.filteredEvents.filter((item) => item.id !== action.payload.id),
        loading: false,
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
        filteredEvents:
          state.filteredEvents &&
          state.filteredEvents.map((item) =>
            item.id === action.payload.id ? action.payload : item,
          ),

        loading: false,
      };
    case EVENTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FILTER_EVENTS:
      // eslint-disable-next-line no-case-declarations
      const sortMeetings = [];
      state.events.forEach((item) => {
        const matchOwner = item.owner.find((el) => el === action.payload);
        if (matchOwner) {
          sortMeetings.push(item);
        }
      });
      return {
        ...state,
        filteredEvents: [...sortMeetings],
      };
    case FILTER_CLEAR:
      return {
        ...state,
        filteredEvents: null,
      };
    default:
      return state;
  }
};
