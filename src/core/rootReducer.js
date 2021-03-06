import { combineReducers } from 'redux';
import { eventsReducer } from 'bus/events/eventsReducer';
import { authReducer } from 'bus/auth/authReducer';
import { alertReducer } from 'bus/alert/alertReducer';
import { usersReducer } from 'bus/users/usersReducer';
import { modalReducer } from 'bus/Modal/modalReducer';

export const rootReducer = combineReducers({
  events: eventsReducer,
  auth: authReducer,
  alert: alertReducer,
  users: usersReducer,
  modal: modalReducer,
});
