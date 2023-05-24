import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const MainPage = () => {
  return (
    <>
      {!localStorage.getItem('token') && <Navigate to="/login" />}
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </div>
      </Container>
    </>
  )
};

export default MainPage;
