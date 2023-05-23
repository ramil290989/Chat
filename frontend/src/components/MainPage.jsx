import {
  Container,
  Row,
  Col,
  Navbar,
  Button,
} from 'react-bootstrap';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { selectors } from '../slices/channelsSlice.js';
import { fetchChannels } from '../slices/channelsSlice.js';

const MainPage = () => {
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </Container>
  );
};

export default MainPage;
