import { io } from 'socket.io-client';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import store from './slices/index.js';

const socket = io();

const socketEvents = {
  newMessage: ({ body, channelId, username }) => socket.emit('newMessage', { body, channelId, username }),
  newChannel: ({ name }) => socket.emit('newChannel', { name }),
  removeChannel: ({ id }) => socket.emit('removeChannel', { id }),
  renameChannel: ({ id, name }) => socket.emit('renameChannel', { id, name }),
};

const socketSubscribe = () => {
  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel(payload));
  });
};

export default socketSubscribe;
export { socket, socketEvents };
