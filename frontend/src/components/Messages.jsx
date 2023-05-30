import React from 'react';
import {io} from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { actions, selectors } from '../slices/messagesSlice.js';

const Messages = () => {
  const dispatch = useDispatch();
  const socket = io("ws://localhost:5001");
  socket.on('newMessage', (payload) => {
    dispatch(actions.addMessage(payload));
  });

  const formik = useFormik({
    initialValues: {
      messageText: '',
    },
    onSubmit: ({ body }) => {
      socket.emit('newMessage', { body, channelId: 1, username: 'admin' })
    },
  });

  const messages = useSelector(selectors.selectAll);
  const currentChannel = useSelector((state) => state.messages.currentChannel);
  const currentChannelMessages = messages.filter((message) => message.channelId === currentChannel.id);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{currentChannel.name}</b>
          </p>
          <span className="text-muted">0 сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentChannelMessages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>: {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <div className="input-group has-validation">
            <input
              id="body"
              name="body"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
              <button type="submit" className="btn btn-group-vertical" disabled="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
          <button onClick={() => socket.emit('newMessage', { body: "message text", channelId: 1, username: 'admin' })}>отправка</button>
        </div>
      </div>
    </div>
  )
};

export default Messages;
