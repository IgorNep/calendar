import { combineReducers } from 'redux';
import { eventsReducer } from 'bus/events/eventsReducer';
import { authReducer } from 'bus/auth/authReducer';
import { alertReducer } from 'bus/alert/alertReducer';

export const rootReducer = combineReducers({
  events: eventsReducer,
  auth: authReducer,
  alert: alertReducer,
});
