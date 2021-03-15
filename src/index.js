import React from 'react';
import ReactDOM from 'react-dom';
import App from 'navigation/App';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'core/store';

import 'assets/styles/index.scss';
import { UsersState } from 'bus/users/UsersState';
import { ModalState } from 'bus/Modal/ModalState';
import { AlertState } from 'bus/alert/AlertState';

ReactDOM.render(
  <React.StrictMode>
    <AlertState>
      <UsersState>
        <ModalState>
          <Provider store={store}>
            <Router>
              <App />
            </Router>
          </Provider>
        </ModalState>
      </UsersState>
    </AlertState>
  </React.StrictMode>,
  document.getElementById('root'),
);
