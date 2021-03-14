/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from 'bus/Modal/modalContext';
import Portal from 'components/common/Portal';
import WrapperForModal from 'components/common/WrapperForModal';
import Button from 'components/common/Button';
import { EventsContext } from 'bus/events/eventsContext';
import { days, time } from 'utils/dataStore';
import { UsersContext } from 'bus/users/usersContext';
import useForm from 'hooks/useForm';
import validateForm from './validateForm';
import DropDownComponent from './DropDownComponent';
import styles from './styles.module.scss';

const AddEventModal = () => {
  const { isOpened, closeModal, modalId } = useContext(ModalContext);
  const [submitted, setSubmitted] = useState(false);
  const { addEvent, events } = useContext(EventsContext);
  const { users } = useContext(UsersContext);
  const [participantsArr, setParticipantsArr] = useState([]);
  const [alert, setAlert] = useState('');
  const setSubmit = () => {
    setSubmitted(true);
  };
  const {
    values,
    errors,
    handleChange,
    submitHandler,
    resetValues,
    onBlurHandler,
  } = useForm(setSubmit, validateForm);

  useEffect(() => {
    if (submitted) {
      const newEvent = {
        fieldId: values.day + values.time.substring(0, 2),
        owner: values.participants,
        title: values.event,
      };
      const eventExist = events.find(
        (item) => item.fieldId === newEvent.fieldId,
      );
      if (eventExist) {
        setAlert('Time Slot Already Reserved!');
        setTimeout(() => {
          setAlert('');
        }, 1500);
        setSubmitted(false);
      } else {
        addEvent(newEvent);
        closeModal();
        resetValues();
        setParticipantsArr([]);
        setSubmitted(false);
      }
    }
  }, [submitted]);
  const onParticipantsChange = (data) => {
    setParticipantsArr((prevState) => {
      const userExists = prevState.find((item) => item === data);
      if (userExists) {
        const newArr = prevState.filter((item) => item !== data);
        handleChange(newArr);
        return newArr;
      }
      handleChange([...participantsArr, data]);
      return [...prevState, data];
    });
  };

  if (!isOpened) return null;

  return (
    isOpened &&
    modalId === 'js-create-event' && (
      <Portal>
        <WrapperForModal title="Create New Event">
          <form className="form" onSubmit={submitHandler}>
            {alert && <p className="alert alert-danger">{alert}</p>}
            <div className="form-group">
              <label htmlFor="event">Event Name</label>
              <input
                id="event"
                name="event"
                type="text"
                className="form-control"
                placeholder="Event name"
                value={values.event}
                onChange={handleChange}
                onBlur={(e) => onBlurHandler(e)}
              />
              {errors.event && (
                <small className="text-danger">{errors.event}</small>
              )}
            </div>
            <DropDownComponent
              users={users}
              values={values}
              onChangeCheckBoxHandler={onParticipantsChange}
              error={errors.participants}
            />
            <div className="form-group pointer">
              <label htmlFor="day">Day</label>
              <select
                className="form-control select"
                name="day"
                id="day"
                value={values.day}
                onChange={handleChange}
                onBlur={(e) => onBlurHandler(e)}
              >
                <option value="">Choose Day</option>
                {days.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.day && (
                <small className="text-danger">{errors.day}</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <select
                className="form-control select"
                name="time"
                id="time"
                value={values.time}
                onChange={handleChange}
                onBlur={(e) => onBlurHandler(e)}
              >
                <option value="">Choose Time</option>
                {time.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.time && (
                <small className="text-danger">{errors.time}</small>
              )}
            </div>

            <div className={styles.buttonsGroup}>
              <Button
                title="Cancel"
                extraClassName="btn-secondary"
                type="button"
                onClick={() => {
                  closeModal();
                  resetValues();
                }}
              />
              <Button
                title="Submit"
                extraClassName="btn-primary"
                type="submit"
              />
            </div>
          </form>
        </WrapperForModal>
      </Portal>
    )
  );
};

export default AddEventModal;
