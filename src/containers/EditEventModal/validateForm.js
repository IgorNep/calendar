const validateForm = (values) => {
  const errors = {};

  if (!values.event.trim()) {
    errors.event = 'Event name is required!';
  }

  if (values.participants.length === 0) {
    errors.participants = 'Participants field is required!';
  }

  if (!values.day.trim()) {
    errors.day = 'Day is required!';
  }
  if (!values.time.trim()) {
    errors.time = 'Time is required!';
  }
  return errors;
};

export default validateForm;
