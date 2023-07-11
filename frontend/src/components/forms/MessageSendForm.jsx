import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import filter from 'leo-profanity';
import { socketEvents } from '../../initSocket.js';
import { AuthorizationData } from '../../contexts/AuthorizationData.js';

const MessageSendForm = () => {
  const [authorizationData] = useContext(AuthorizationData);
  const { username } = authorizationData;

  const messageInput = useRef(null);
  useEffect(() => {
    messageInput.current.focus();
  });

  const currentChannel = useSelector((state) => state.channels.currentChannel);

  const { t } = useTranslation();

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{
          body: '',
        }}
        onSubmit={({ body }, formikBag) => {
          const messageBody = filter.clean(body);
          socketEvents.newMessage({ body: messageBody, channelId: currentChannel.id, username });
          formikBag.resetForm();
        }}
      >
        {(formProps) => (
          <form noValidate className="py-1 border rounded-2" onSubmit={formProps.handleSubmit}>
            <div className="input-group has-validation">
              <input
                ref={messageInput}
                id="body"
                name="body"
                type="text"
                aria-label={t('inputs.message.ariaLabel')}
                className="border-0 p-0 ps-2 form-control"
                placeholder={t('inputs.message.placeholder')}
                onChange={formProps.handleChange}
                value={formProps.values.body}
              />
              <button type="submit" className="btn btn-group-vertical" disabled={!formProps.values.body}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                <span className="visually-hidden">{t('buttons.send')}</span>
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default MessageSendForm;
