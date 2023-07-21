import React, { useEffect, useRef } from 'react';

const MessagesContent = (props) => {
  const { currentChannelMessages } = props;
  const messages = useRef();

  useEffect(() => {
    if (messages.current) {
      messages.current.scrollTop = messages.current.scrollHeight;
    }
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messages}>
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
