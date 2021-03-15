import { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from 'utils/helpers/capitalizeFirstLetter';

const useForm = (callback, validate) => {
  const initialValues = {
    event: '',
    participants: [],
    day: '',
    time: '',
  };
  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    if (Array.isArray(e)) {
      setValues({
        ...values,
        participants: e,
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  const resetValues = () => {
    setIsSubmitting(false);
    setValues(initialValues);
    setErrors({});
  };
  const onBlurHandler = (e) => {
    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        [e.target.name]: `${capitalizeFirstLetter(e.target.name)} is required!`,
      });
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);
  return {
    handleChange,
    submitHandler,
    resetValues,
    onBlurHandler,
    errors,
    values,
  };
};

export default useForm;
