import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import MessagesHeader from './MessagesHeader.jsx';
import MessagesContent from './MessagesContent.jsx';
import MessageSendForm from '../forms/MessageSendForm.jsx';

const Messages = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const currentChannelMessages = messages
    .filter((message) => message.channelId === currentChannel.id);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader
          currentChannel={currentChannel}
          currentChannelMessages={currentChannelMessages}
        />
        <MessagesContent
          currentChannelMessages={currentChannelMessages}
        />
        <MessageSendForm />
      </div>
    </div>
  );
};

export default Messages;
