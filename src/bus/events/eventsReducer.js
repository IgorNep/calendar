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
  SET_CURRENT_EVENT,
  CLEAR_CURRENT_EVENT,
  CLEAR_EVENTS,
} from './eventsTypes';

const initialState = {
  events: null,
  currentEvent: null,
  filteredEvents: null,
  loading: false,
  success: null,
  error: null,
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_REQUEST:
      return { ...state, loading: true, success: null, error: null };
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload.events,
        success: action.payload.success,
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload.event],
        success: action.payload.success,
        loading: false,
      };
    case SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.payload,
      };
    case CLEAR_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: null,
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        events: null,
        filteredEvents: null,
        currentEvent: null,
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(
          (item) => item.id !== action.payload.event.id,
        ),
        filteredEvents:
          state.filteredEvents &&
          state.filteredEvents.filter(
            (item) => item.id !== action.payload.event.id,
          ),
        success: action.payload.success,
        loading: false,
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((item) =>
          item.id === action.payload.event.id ? action.payload.event : item,
        ),
        filteredEvents:
          state.filteredEvents &&
          state.filteredEvents.map((item) =>
            item.id === action.payload.event.id ? action.payload.event : item,
          ),
        success: action.payload.success,
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
