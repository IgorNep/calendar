import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ title, disabled, extraClassName, ...props }) => {
  const buttonStyle = useMemo(
    () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      classNames('btn', extraClassName, {
        'btn-disabled': disabled,
      }),
    [disabled, extraClassName],
  );

  return (
    <button
      type="button"
      disabled={disabled}
      className={buttonStyle}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {title}
    </button>
  );
};
Button.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  extraClassName: PropTypes.string,
};
Button.defaultProps = {
  title: 'Button',
  disabled: false,
  extraClassName: 'btn',
};
export default Button;
