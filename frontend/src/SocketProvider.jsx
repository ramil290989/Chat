import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { socket, socketEvents } from './initSocket.js';
import SocketContext from './contexts/SocketContext.js';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const newMessage = (message) => {
      dispatch(messagesActions.addMessage(message));
    };
    const newChannel = (channel) => {
      dispatch(channelsActions.addChannel(channel));
    };
    const removeChannel = (channel) => {
      dispatch(channelsActions.removeChannel(channel));
    };
    const renameChannel = (channel) => {
      dispatch(channelsActions.renameChannel(channel));
    };

    socket.on('newMessage', newMessage);
    socket.on('newChannel', newChannel);
    socket.on('removeChannel', removeChannel);
    socket.on('renameChannel', renameChannel);

    return () => {
      socket.off('newMessage', newMessage);
      socket.off('newChannel', newChannel);
      socket.off('removeChannel', removeChannel);
      socket.off('renameChannel', renameChannel);
    };
  }, []);

  return (
    <SocketContext.Provider value={socketEvents}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
