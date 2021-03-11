import { AuthContext } from 'bus/auth/authContext';
import { EventsContext } from 'bus/events/eventsContext';
import { ModalContext } from 'bus/Modal/modalContext';
import { UsersContext } from 'bus/users/usersContext';
import Button from 'components/common/Button';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { openModal } = useContext(ModalContext);
  const { isAuthenticated, logout, isAdmin, user } = useContext(AuthContext);
  const { users } = useContext(UsersContext);
  const { filterEvents, clearFilteredEvents } = useContext(EventsContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  };
  const onChangeHandler = (e) => {
    if (e.target.value.trim() === '') {
      clearFilteredEvents();
      return;
    }
    filterEvents(e.target.value);
  };

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg mb-3">
      <div className="container">
        <div className="navbar-brand">
          <i className="fa fa-calendar" />
          {' '}
          Calendar
        </div>
        <ul className="navbar-nav">
          {isAdmin && (
            <li className="nav-item">
              <Button
                extraClassName="btn-secondary py-2"
                title="+ Add Event"
                onClick={() => openModal('js-create-event')}
              />
            </li>
          )}

          <li className="nav-item">
            <select
              className="form-select form-select-lg py-2"
              onChange={onChangeHandler}
            >
              <option value="">All Participants</option>
              {users.map((userItem) => (
                <option key={userItem.id} value={userItem.name}>
                  {userItem.name}
                </option>
              ))}
            </select>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  {' '}
                  <i className="fa fa-user" />
                  {' '}
                  Hi,
                  {user.name}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={logoutHandler}>
                  {' '}
                  <i className="fa fa-sign-out" />
                  {' '}
                  Logout
                  {' '}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
