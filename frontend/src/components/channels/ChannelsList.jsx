import React from 'react';
import ChannelAsButton from './ChannelAsButton';

const ChannelsList = (props) => {
  const { channels, setRemoveChannelModalProps, setRenameChannelModalProps } = props;
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
          <ChannelAsButton
            channel={channel}
            setRemoveChannelModalProps={setRemoveChannelModalProps}
            setRenameChannelModalProps={setRenameChannelModalProps}
          />
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
