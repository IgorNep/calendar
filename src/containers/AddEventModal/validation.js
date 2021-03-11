import { array, object, string } from 'yup';
import { days, time } from 'utils/dataStore';

const createEvent = {
  shape: {
    title: '',
    participants: ['Maxim', 'Admin'],
    time: '',
    day: '',
    friends: [],
  },
  schema: object().shape({
    title: string()
      .min(3, 'Must be 3 or more characters')
      .max(20, 'Must be 20 or less characters')
      .required('Event is required'),
    participants: array().of(string()).required('Participant is required'),
    time: string()
      .oneOf([...time], 'Invalid time')
      .required('Time is required'),
    day: string()
      .oneOf([...days], 'Invalid day')
      .required('Day is required'),
  }),
};
export default createEvent;
