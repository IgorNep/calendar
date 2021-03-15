import React from 'react';
import ReactDOM from 'react-dom';
import App from 'navigation/App';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'core/store';

import 'assets/styles/index.scss';
import { UsersState } from 'bus/users/UsersState';
import { EventState } from 'bus/events/EventsState';
import { ModalState } from 'bus/Modal/ModalState';
import { AuthState } from 'bus/auth/AuthState';
import { AlertState } from 'bus/alert/AlertState';

ReactDOM.render(
  <React.StrictMode>
    <AlertState>
      <AuthState>
        <UsersState>
          <EventState>
            <ModalState>
              <Provider store={store}>
                <Router>
                  <App />
                </Router>
              </Provider>
            </ModalState>
          </EventState>
        </UsersState>
      </AuthState>
    </AlertState>
  </React.StrictMode>,
  document.getElementById('root'),
);
