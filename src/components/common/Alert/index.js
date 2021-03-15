import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { alertSelector } from 'bus/alert/alertSelectors';
import { hideAlert } from 'bus/alert/alertActions';
import styles from './styles.module.scss';

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector(alertSelector);

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
          onClick={() => dispatch(hideAlert())}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Alert;
