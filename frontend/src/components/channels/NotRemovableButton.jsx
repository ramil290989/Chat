import React from 'react';
import { Button } from 'react-bootstrap';

const NotRemovableButton = (props) => {
  const { currentChannel, channel, onClick } = props;
  return (
    <Button
      variant={currentChannel.id === channel.id ? 'secondary' : ''}
      className="w-100 rounded-0 text-start text-truncate"
      onClick={() => onClick()}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};

export default NotRemovableButton;
