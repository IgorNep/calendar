import React from 'react';
import Navbar from 'components/Navbar';
import MainScreen from 'containers/MainScreen';
import AddEventModal from 'containers/AddEventModal';
import Alert from 'components/common/Alert';

const Private = () => (
  <>
    <Navbar />
    <div className="container">
      <Alert alert={{ message: 'TEST ALERT' }} />
      <MainScreen />
      <AddEventModal />
    </div>
  </>
);

export default Private;
