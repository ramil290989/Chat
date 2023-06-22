import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import MessageSendForm from './forms/MessageSendForm.jsx';

const Messages = () => {

  const { t } = useTranslation();

  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const currentChannelMessages = messages.filter((message) => message.channelId === currentChannel.id);

  const MessagesHeader = () => (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>#{currentChannel.name}</b></p>
      <span className="text-muted">{t('titles.messagesInfo.message', { count: currentChannelMessages.length })}</span>
    </div>
  );

  const Content = () => (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {currentChannelMessages.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>: {message.body}
        </div>
      ))}
    </div>
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader />
        <Content />
        <MessageSendForm />
      </div>
    </div>
  )
};

export default Messages;
