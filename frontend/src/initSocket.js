import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';

const socket = io(URL);

const socketEvents = {
  newMessage: ({ body, channelId, username }) => socket.emit('newMessage', { body, channelId, username }),
  newChannel: ({ name }, dispatch) => socket.emit('newChannel', { name }, ({ data }) => {
    dispatch(data);
  }),
  removeChannel: ({ id }) => socket.emit('removeChannel', { id }),
  renameChannel: ({ id, name }) => socket.emit('renameChannel', { id, name }),
};

export { socket, socketEvents };
