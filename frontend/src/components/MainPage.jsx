import React from 'react';
import { Navigate } from 'react-router-dom';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const MainPage = () => {
  return (
    <>
      {!localStorage.token && <Navigate to="/login" />}
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />    
          <Messages />
        </div>
      </div>
    </>
  )
};

export default MainPage;
