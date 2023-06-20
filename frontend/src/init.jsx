import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import socket from './socket.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import resources from './locales';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './slices/index.js';
import App from './components/App.jsx';

const rollbarConfig = {
  accessToken: '881a188e6cb04e7dba37d813f59c6b19',
  environment: 'testenv',
};

const TestError = () => {
  const a = null;
  return a.hello();
};

var leoProfanity = require('leo-profanity');
var russianBadwordsList = require('russian-bad-words');
leoProfanity.clearList();
leoProfanity.add(russianBadwordsList.flatWords);

const init = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources
    });

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel(payload));
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
}

export default init;
