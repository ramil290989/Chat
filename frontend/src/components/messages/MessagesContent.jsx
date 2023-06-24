import React from 'react';

const MessagesContent = (props) => {
  const { currentChannelMessages } = props;
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {currentChannelMessages.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>
          :
          {message.body}
        </div>
      ))}
    </div>
  );
};

export default MessagesContent;
