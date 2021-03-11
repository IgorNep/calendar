import React, { useContext } from 'react';
// import Public from './Public';
import SignInContainer from 'containers/SignInContainer';
import { AuthContext } from 'bus/auth/authContext';
import Private from './Private';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <SignInContainer />
      {isAuthenticated && <Private />}
    </>
  );
};

export default App;
