import React from 'react';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const modalWindows = {
  addChannel: AddChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelModal,
};

const ModalWindow = ({ window }) => {
  const SelectedModalWindow = modalWindows[window];
  return (
    <SelectedModalWindow />
  );
};

export default ModalWindow;
