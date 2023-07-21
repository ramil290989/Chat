import { useContext } from 'react';
import SocketContext from '../contexts/SocketContext';

const useNewChannel = () => {
  const { newChannel } = useContext(SocketContext);
  return newChannel;
};

const useRenameChannel = () => {
  const { renameChannel } = useContext(SocketContext);
  return renameChannel;
};

const useRemoveChannel = () => {
  const { removeChannel } = useContext(SocketContext);
  return removeChannel;
};

const useNewMessage = () => {
  const { newMessage } = useContext(SocketContext);
  return newMessage;
};

export {
  useNewChannel,
  useRenameChannel,
  useRemoveChannel,
  useNewMessage,
};
