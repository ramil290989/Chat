import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import socket from '../initSocket.js';
import SocketContext from '../contexts/SocketContext.js';
import { notifyOk } from '../components/notify.jsx';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const socketEvents = {
    newMessage: ({ body, channelId, username }) => socket.emit('newMessage', { body, channelId, username }),
    newChannel: ({ name }) => socket.emit('newChannel', { name }, ({ data }) => {
      dispatch(channelsActions.changeCurrentChannel(data));
      notifyOk(t('toastifyNotify.channelAdded'));
    }),
    removeChannel: ({ id }) => socket.emit('removeChannel', { id }, () => {
      notifyOk(t('toastifyNotify.channelRemoved'));
    }),
    renameChannel: ({ id, name }) => socket.emit('renameChannel', { id, name }, () => {
      notifyOk(t('toastifyNotify.channelRenamed'));
    }),
  };

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
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socketEvents}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
