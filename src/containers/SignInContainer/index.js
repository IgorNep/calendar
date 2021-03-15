import React, { useContext, useEffect, useState } from 'react';
import Portal from 'components/common/Portal';
import WrapperForModal from 'components/common/WrapperForModal';
import { ModalContext } from 'bus/Modal/modalContext';
import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedSelector } from 'bus/auth/authSelectors';
import { authUser, setAsAdmin } from 'bus/auth/authActions';
import { showAlert } from 'bus/alert/alertActions';
import {
  errorSelector,
  loadingSelector,
  usersSelector,
} from 'bus/users/usersSelectors';
import { getUsers } from 'bus/users/usersActions';

const SignInContainer = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const users = useSelector(usersSelector);
  const usersLoading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);

  const [userInfo, setUserInfo] = useState('');
  const [alert, setAlert] = useState('');
  const { openModal, closeModal, isOpened, modalId } = useContext(ModalContext);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getUsers());
      openModal('js-signin');
    }
  }, [isAuthenticated]);

  if (error) {
    dispatch(showAlert({ message: error, type: 'danger' }));
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (userInfo.trim() === '') {
      // eslint-disable-next-line
      setAlert('Authorization is required!');
      setTimeout(() => setAlert(''), 1500);
      return;
    }
    const userFind = users.find((user) => user.name === userInfo);
    if (userFind.isAdmin) {
      dispatch(setAsAdmin());
    }
    dispatch(authUser(userFind));
    closeModal();
  };
  return usersLoading ? (
    <Loader />
  ) : (
    users && isOpened && modalId === 'js-signin' && (
      <Portal>
        <WrapperForModal title="Please Authorize">
          <form onSubmit={onSubmitHandler}>
            <div className="form-group pb-2 ">
              <label htmlFor="userInfo">Authorize</label>
              <select
                className="form-control select "
                name="userInfo"
                id="userInfo"
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
              {alert && <p className="text-danger p-0 m-0">{alert}</p>}
            </div>

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
