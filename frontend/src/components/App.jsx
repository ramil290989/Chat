import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ContextData } from '../contexts/ContextData.js';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { fetchChannels, actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import HeaderNav from './HeaderNav.jsx';
import PageNotFound from './PageNotFound.jsx';
import MainPage from './MainPage.jsx'
import SignUpForm from './SignUpForm.jsx';

const App = () => {
  const { username, token } = localStorage;
  const socket = io("ws://localhost:5001");
  const [data] = useState({ username, token, socket });
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchChannels(data.token));
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel(payload));
    });
  }, []);

  return (
    <ContextData.Provider value={[data]}>
      <div className="d-flex flex-column h-100">
        <HeaderNav />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="" element={<MainPage />} />
            <Route path="login" element={<SignUpForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ContextData.Provider>
  );
}

export default App;
