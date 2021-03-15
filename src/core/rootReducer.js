import { combineReducers } from 'redux';
import { eventsReducer } from 'bus/events/eventsReducer';

export const rootReducer = combineReducers({
  events: eventsReducer,
});
