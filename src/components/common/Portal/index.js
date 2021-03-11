import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Portal = ({ children, className = 'root-portal', el = 'div' }) => {
  const [container] = useState(document.createElement(el));

  container.classList.add(className);

  useEffect(() => {
    document.body.appendChild(container);
    container.setAttribute('class', styles.wrapper);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeChild(container);
      document.body.style.overflow = 'auto';
    };
  }, [container]);
  return createPortal(children, container);
};

Portal.propTypes = {
  el: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Portal;
