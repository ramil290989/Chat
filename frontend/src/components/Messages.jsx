import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { ContextData } from '../contexts/ContextData.js';

const Messages = () => {
  
  const [data] = useContext(ContextData);
  const { username, socket } = data;

  const messageInput = useRef(null);
  useEffect(() => {
    messageInput.current.focus();
  });

  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const currentChannelMessages = messages.filter((message) => message.channelId === currentChannel.id);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>#{currentChannel.name}</b>
          </p>
          <span className="text-muted">{currentChannelMessages.length} сообщения</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentChannelMessages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>: {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={{
              body: '',
            }}
            onSubmit={({ body }, formikBag) => {
              socket.emit('newMessage', { body, channelId: currentChannel.id, username });
              formikBag.resetForm();
            }}
          >
            {(formProps) => (
              <form className="py-1 border rounded-2" onSubmit={formProps.handleSubmit}>
                <div className="input-group has-validation">
                  <input
                    ref={messageInput}
                    id="body"
                    name="body"
                    type="text"
                    className="border-0 p-0 ps-2 form-control"
                    placeholder="введите текст сообщения"
                    onChange={formProps.handleChange}
                    value={formProps.values.body}
                  />
                  <button type="submit" className="btn btn-group-vertical" disabled="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
};

export default Messages;
