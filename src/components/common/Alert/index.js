import React, { useContext } from 'react';
import { AlertContext } from 'bus/alert/alertContext';
import classnames from 'classnames';
import styles from './styles.module.scss';

const Alert = () => {
  const { alert, hideAlert } = useContext(AlertContext);

  if (!alert) return null;

  return (
    <div className={classnames(styles.alertWrapper)}>
      <div
        className={`alert alert-${alert.type || 'secondary'} alert-dismissible`}
      >
        {' '}
        {alert.message}
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={hideAlert}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Alert;
