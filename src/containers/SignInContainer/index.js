import React, { useEffect, useState } from 'react';
import Portal from 'components/common/Portal';
import WrapperForModal from 'components/common/WrapperForModal';
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
import { closeModal, openModal } from 'bus/Modal/modalActions';
import { isOpenedSelector, modalIdSelector } from 'bus/Modal/modalSelectors';
import Alert from 'components/common/Alert';

const SignInContainer = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const users = useSelector(usersSelector);
  const usersLoading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const isOpened = useSelector(isOpenedSelector);
  const modalId = useSelector(modalIdSelector);

  const [userInfo, setUserInfo] = useState('');
  const [alert, setAlert] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getUsers());
      dispatch(openModal('js-signin'));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      dispatch(showAlert({ message: error.message, type: 'danger' }));
    }
  }, [error]);

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
    dispatch(closeModal());
  };
  return usersLoading ? (
    <Loader />
  ) : (
    users && isOpened && modalId === 'js-signin' && (
      <Portal>
        <WrapperForModal title="Please Authorize">
          {error && <Alert />}
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
