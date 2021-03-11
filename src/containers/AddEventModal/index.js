/* eslint-disable jsx-a11y/control-has-associated-label */
import { ModalContext } from 'bus/Modal/modalContext';
import Portal from 'components/common/Portal';
import WrapperForModal from 'components/common/WrapperForModal';
import React, { useContext } from 'react';
import { Form, Formik } from 'formik';
import { MyTextInput, MySelect } from 'components/TextInputGroup';
import Button from 'components/common/Button';
import { EventsContext } from 'bus/events/eventsContext';
import { AlertContext } from 'bus/alert/alertContext';
import Alert from 'components/common/Alert';
import { days, time } from 'utils/dataStore';
import { UsersContext } from 'bus/users/usersContext';
import createEvent from './validation';
import styles from './styles.module.scss';

const AddEventModal = () => {
  const { isOpened, closeModal, modalId } = useContext(ModalContext);
  const { showAlert } = useContext(AlertContext);
  const { addEvent, events } = useContext(EventsContext);
  const { users } = useContext(UsersContext);

  if (!isOpened) return null;

  return (
    isOpened &&
    modalId === 'js-create-event' && (
      <Portal>
        <WrapperForModal title="Create New Event">
          <Alert />
          <Formik
            initialValues={createEvent.shape}
            validationSchema={createEvent.schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const newEvent = {
                fieldId: values.day + values.time.substring(0, 2),
                owner: values.participants,
                title: values.title,
              };
              const eventExist = events.find(
                (item) => item.fieldId === newEvent.fieldId,
              );
              if (eventExist) {
                showAlert({
                  message: 'Time Slot Already Reserved!',
                  type: 'danger',
                });
              } else {
                addEvent(newEvent);
                closeModal();
                resetForm({});
              }
              setSubmitting(false);
            }}
          >
            {
              // eslint-disable-next-line no-unused-vars
              ({ isSubmitting, resetForm, setFieldValue }) => (
                <Form>
                  <MyTextInput
                    label="Name of Event"
                    name="title"
                    type="text"
                    placeholder="Event name"
                    disabled={isSubmitting}
                  />
                  <MySelect
                    label="Participants"
                    name="participants"
                    disabled={isSubmitting}
                    multiple
                  >
                    <option value="" disabled>
                      {users.map((user) => user.name).join(',')}
                    </option>
                    {users.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </MySelect>

                  <MySelect label="Day" name="day" disabled={isSubmitting}>
                    <option value="" />
                    {days.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </MySelect>
                  <MySelect label="Time" name="time" disabled={isSubmitting}>
                    <option value="" />
                    {time.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </MySelect>
                  <div className={styles.buttonsGroup}>
                    <Button
                      title="Cancel"
                      disabled={isSubmitting}
                      extraClassName="btn-secondary"
                      type="button"
                      onClick={closeModal}
                    />
                    <Button
                      title="Submit"
                      disabled={isSubmitting}
                      extraClassName="btn-primary"
                      type="submit"
                    />
                  </div>
                </Form>
              )
            }
          </Formik>
        </WrapperForModal>
      </Portal>
    )
  );
};

export default AddEventModal;
