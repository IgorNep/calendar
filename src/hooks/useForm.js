import { useEffect, useState } from 'react';

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
    const { name, value } = e.target;
    if (e.target.multiple) {
      const newValue = Array.from(
        e.target.selectedOptions,
        (option) => option.value,
      );
      setValues({
        ...values,
        [name]: newValue,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
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

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);
  return {
    handleChange,
    submitHandler,
    resetValues,
    errors,
    values,
  };
};

export default useForm;
