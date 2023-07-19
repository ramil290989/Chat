import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { actions as channelsActions } from '../../slices/channelsSlice';

const ChannelButton = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.channels.currentChannel);

  const changeCurrentChannel = () => {
    dispatch(channelsActions.changeCurrentChannel(channel));
  };

  return (
    <Button
      variant={currentChannel.id === channel.id ? 'secondary' : ''}
      className="w-100 rounded-0 text-start text-truncate"
      onClick={() => changeCurrentChannel()}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};

export default ChannelButton;
