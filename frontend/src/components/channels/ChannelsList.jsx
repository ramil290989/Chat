import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slices/channelsSlice.js';
import RemovableButton from './RemovableButton.jsx';
import NotRemovableButton from './NotRemovableButton';

const ChannelsList = (props) => {
  const { channels, setRemoveChannelModalProps, setRenameChannelModalProps } = props;
  const currentChannel = useSelector((state) => state.channels.currentChannel);

  const dispatch = useDispatch();

  const changeCurrentChannel = (channel) => {
    dispatch(actions.changeCurrentChannel(channel));
  };

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
          {!channel.removable
            ? (
              <NotRemovableButton
                currentChannel={currentChannel}
                channel={channel}
                onClick={() => changeCurrentChannel(channel)}
              />
            )
            : (
              <RemovableButton
                currentChannel={currentChannel}
                channel={channel}
                onClick={() => changeCurrentChannel(channel)}
                setRemoveChannelModalProps={setRemoveChannelModalProps}
                setRenameChannelModalProps={setRenameChannelModalProps}
              />
            )}
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
