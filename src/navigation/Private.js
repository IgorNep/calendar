import React from 'react';
import Navbar from 'components/Navbar';
import MainScreen from 'containers/MainScreen';
import AddEventModal from 'containers/AddEventModal';
import Alert from 'components/common/Alert';
import EditEventModal from 'containers/EditEventModal';

const Private = () => (
  <>
    <Navbar />
    <div className="container">
      <Alert />
      <MainScreen />
      <AddEventModal />
      <EditEventModal />
    </div>
  </>
);

export default Private;
