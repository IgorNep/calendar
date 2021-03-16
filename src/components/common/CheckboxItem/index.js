/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

const CheckboxItem = ({ user, onChangeHandler, values }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (values.participants.length > 0) {
      if (values.participants.find((item) => item === user.name)) {
        setIsChecked(true);
      }
    }
  }, [values]);

  return (
    <label htmlFor={user.id} key={user.id} className={styles.selectOptions}>
      {user.name}
      <input
        type="checkbox"
        id={user.id}
        value={isChecked}
        // value={user}
        // checked={isChecked}
        onChange={() => {
          onChangeHandler(user.name);
          setIsChecked(!isChecked);
        }}
      />
      {isChecked && (
        <i className="fa fa-check " style={{ marginRight: '0.5rem' }} />
      )}
    </label>
  );
};

export default CheckboxItem;
