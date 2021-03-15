import React from 'react';
// import Public from './Public';
import SignInContainer from 'containers/SignInContainer';
import { useSelector } from 'react-redux';
import { isAuthenticatedSelector } from 'bus/auth/authSelectors';
import Private from './Private';

const App = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return (
    <>
      <SignInContainer />
      {isAuthenticated && <Private />}
    </>
  );
};

export default App;
