import React, { useContext, useEffect } from 'react';
import { UsersContext } from 'bus/users/usersContext';
import Portal from 'components/common/Portal';
import WrapperForModal from 'components/common/WrapperForModal';
import { MySelect } from 'components/TextInputGroup';
import { Formik, Form } from 'formik';
import { ModalContext } from 'bus/Modal/modalContext';
import * as Yup from 'yup';
import Button from 'components/common/Button';
import { AuthContext } from 'bus/auth/authContext';
import Loader from 'components/common/Loader';
import { AlertContext } from 'bus/alert/alertContext';

const SignInContainer = () => {
  const { getUsers, users, loading, error } = useContext(UsersContext);
  const { openModal, closeModal, isOpened, modalId } = useContext(ModalContext);
  const { isAuthenticated, authUser, setAsAdmin } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (!isAuthenticated) {
      getUsers();
      openModal('js-signin');
    }
  }, [isAuthenticated]);

  if (error) {
    showAlert({ message: error, type: 'danger' });
  }
  return loading ? (
    <Loader />
  ) : (
    users && isOpened && modalId === 'js-signin' && (
      <Portal>
        <WrapperForModal title="Please Authorize">
          <Formik
            initialValues={{ name: '' }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Authoriztion is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const user = users.find((item) => item.id === values.name);
              if (user) {
                if (user.isAdmin) {
                  setAsAdmin();
                }
                authUser(user);
              }

              setSubmitting(false);
              closeModal();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <MySelect label="User" name="name" disabled={isSubmitting}>
                  <option value="">Choose Name</option>
                  {users.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </MySelect>
                <Button
                  title="Submit"
                  disabled={isSubmitting}
                  extraClassName="btn-primary"
                  type="submit"
                />
              </Form>
            )}
          </Formik>
        </WrapperForModal>
      </Portal>
    )
  );
};

export default SignInContainer;
