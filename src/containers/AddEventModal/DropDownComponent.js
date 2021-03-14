/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import CheckboxItem from './CheckboxItem';

const DropDownCOmponent = ({
  users,
  onChangeCheckBoxHandler,
  error,
  values,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  return (
    <div className="form-group">
      <p style={{ marginBottom: '0.2rem' }}>Participants</p>
      <div
        className={styles.selectWrapper}
        style={
          isOpen
            ? {
                border: '3px solid rgba(0,123,255, 0.3)',
              }
            : {
                border: '3px solid transparent',
              }
        }
      >
        <div
          className={classnames('form-control', styles.selectHeader)}
          style={
            isOpen
              ? {
                  border: '1px solid rgba(0,123,255, 0.9)',
                  boxShadow: '0px 5px 5px rgba(0,123,255, 0.4)',
                }
              : {
                  border: '1px solid #ced4da',
                  boxShadow: 'none',
                }
          }
          onClick={() => {
            setIsOpen(!isOpen);
            setCounter(counter + 1);
          }}
        >
          {values.participants.length > 0
            ? `${values.participants
                .map((user) => user)
                .join(',')
                .substring(0, 25)}...`
            : `${users
                .map((user) => user.name)
                .join(',')
                .substring(0, 25)}...`}

          <i className="fa fa-angle-down" style={{ fontWeight: 'bold' }} />
        </div>

        <div
          className={styles.selectGroup}
          style={isOpen ? { visibility: 'visible' } : { visibility: 'hidden' }}
        >
          {users.map((user) => (
            <CheckboxItem
              key={user.id}
              user={user}
              onChangeHandler={onChangeCheckBoxHandler}
            />
          ))}
        </div>
      </div>
      {error && <small className="text-danger px-1 ">{error}</small>}
    </div>
  );
};

export default DropDownCOmponent;
