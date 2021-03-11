import React from 'react';
import styles from './styles.module.scss';

const Loader = () => (
  <div className={styles.loader}>
    <div className="spinner-border text-primary " role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loader;
