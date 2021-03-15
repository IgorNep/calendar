/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const TextInputGroup = ({
  label,
  name,
  type,
  value,
  placeholder,
  handleChange,
  onBlurHandler,
  error,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={(e) => onBlurHandler(e)}
    />
    {error && <small className="text-danger">{error}</small>}
  </div>
);

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onBlurHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
};
TextInputGroup.defaultProps = {
  type: 'text',
};

export default TextInputGroup;
