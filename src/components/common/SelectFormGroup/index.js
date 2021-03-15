/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const SelectFormGroup = ({
  value,
  handleChange,
  onBlurHandler,
  error,
  optionsArr,
  label,
  name,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select
      className="form-control select"
      name={name}
      id={name}
      value={value}
      onChange={handleChange}
      onBlur={(e) => onBlurHandler(e)}
    >
      <option value="">Choose {label}</option>
      {optionsArr.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
    {error && <small className="text-danger">{error}</small>}
  </div>
);

SelectFormGroup.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onBlurHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  optionsArr: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectFormGroup;
