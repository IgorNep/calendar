import React, { useContext, useEffect, useState } from 'react';
import { UsersContext } from 'bus/users/usersContext';
import Portal from 'components/common/Portal';
import WrapperForModal from 'components/common/WrapperForModal';
import { ModalContext } from 'bus/Modal/modalContext';
import Button from 'components/common/Button';
import { AuthContext } from 'bus/auth/authContext';
import Loader from 'components/common/Loader';
import { AlertContext } from 'bus/alert/alertContext';

const SignInContainer = () => {
  const [userInfo, setUserInfo] = useState('');
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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (userInfo.trim() === '') {
      alert('Authorization is required');
      return;
    }
    const userFind = users.find((user) => user.name === userInfo);
    if (userFind.isAdmin) {
      setAsAdmin();
    }
    authUser(userFind);
    closeModal();
  };
  return loading ? (
    <Loader />
  ) : (
    users && isOpened && modalId === 'js-signin' && (
      <Portal>
        <WrapperForModal title="Please Authorize">
          <form onSubmit={onSubmitHandler}>
            <select
              value={userInfo}
              onChange={(e) => {
                setUserInfo(e.target.value);
              }}
            >
              <option value="">Choose Name</option>
              {users.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <Button
              type="submit"
              title="Authorize"
              className="btn btn-primary"
            />
          </form>
        </WrapperForModal>
      </Portal>
    )
  );
};

export default SignInContainer;
