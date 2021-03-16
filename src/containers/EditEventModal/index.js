/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import Portal from 'components/common/Portal';
import WrapperForModal from 'components/common/WrapperForModal';
import Button from 'components/common/Button';
import { days, time } from 'utils/dataStore';
import useForm from 'hooks/useForm';
import DropDownComponent from 'components/common/DropDownComponent';
import SelectFormGroup from 'components/common/SelectFormGroup';
import TextInputGroup from 'components/common/TextInputGroup';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentEventSelector,
  eventsSelector,
} from 'bus/events/eventsSelectors';
import { clearCurrentEvent, updateEvent } from 'bus/events/eventsActions';
import { usersSelector } from 'bus/users/usersSelectors';
import { closeModal } from 'bus/Modal/modalActions';
import { isOpenedSelector, modalIdSelector } from 'bus/Modal/modalSelectors';
import validateForm from './validateForm';
import styles from './styles.module.scss';

const EditEventModal = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  const users = useSelector(usersSelector);
  const currentEvent = useSelector(currentEventSelector);
  const isOpened = useSelector(isOpenedSelector);
  const modalId = useSelector(modalIdSelector);
  const [submitted, setSubmitted] = useState(false);
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
    setInitialValues,
  } = useForm(setSubmit, validateForm);

  useEffect(() => {
    if (currentEvent) {
      const initialValues = {
        event: currentEvent.title,
        participants: currentEvent.owner,
        day: currentEvent.day,
        time: currentEvent.time,
      };
      setInitialValues(initialValues);
    }
  }, [currentEvent]);

  useEffect(() => {
    if (submitted) {
      const newEvent = {
        fieldId: values.day + values.time.substring(0, 2),
        owner: values.participants,
        title: values.event,
        time: values.time,
        day: values.day,
        id: currentEvent.id,
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
        dispatch(updateEvent(newEvent));
        dispatch(closeModal());
        resetValues();
        setParticipantsArr([]);
        setSubmitted(false);
        dispatch(clearCurrentEvent());
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
    modalId === 'js-edit-modal' && (
      <Portal>
        <WrapperForModal title="Edit Event">
          <form className="form" onSubmit={submitHandler}>
            {alert && <p className="alert alert-danger">{alert}</p>}

            <TextInputGroup
              label="Event Name"
              name="event"
              value={values.event}
              placeholder="Event Name"
              handleChange={handleChange}
              onBlurHandler={onBlurHandler}
              error={errors.event}
            />
            <DropDownComponent
              users={users}
              values={values}
              onChangeCheckBoxHandler={onParticipantsChange}
              error={errors.participants}
            />
            <SelectFormGroup
              value={values.day}
              handleChange={handleChange}
              onBlurHandler={onBlurHandler}
              error={errors.day}
              optionsArr={days}
              label="Day"
              name="day"
            />
            <SelectFormGroup
              value={values.time}
              handleChange={handleChange}
              onBlurHandler={onBlurHandler}
              error={errors.time}
              optionsArr={time}
              label="Time"
              name="time"
            />
            <div className={styles.buttonsGroup}>
              <Button
                title="Cancel"
                extraClassName="btn-secondary"
                type="button"
                onClick={() => {
                  dispatch(closeModal());
                  dispatch(clearCurrentEvent());
                  setParticipantsArr([]);
                  resetValues();
                }}
              />
              <Button
                title="Update"
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

export default EditEventModal;
