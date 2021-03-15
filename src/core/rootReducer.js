import { combineReducers } from 'redux';
import { eventsReducer } from 'bus/events/eventsReducer';
import { authReducer } from 'bus/auth/authReducer';

export const rootReducer = combineReducers({
  events: eventsReducer,
  auth: authReducer,
});
