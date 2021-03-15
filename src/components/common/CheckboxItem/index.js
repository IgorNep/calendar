/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styles from './styles.module.scss';

const CheckboxItem = ({ user, onChangeHandler }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label htmlFor={user.id} key={user.id} className={styles.selectOptions}>
      {user.name}
      <input
        type="checkbox"
        id={user.id}
        value={user}
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
