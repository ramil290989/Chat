import React from 'react';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import initI18n from './initI18n.js';
import initLeoProfanity from './initLeoProfanity.js';
import socketSubscribe from './initSocket.js';
import store from './slices/index.js';
import App from './components/App.jsx';

const init = async () => {
  await initI18n();
  initLeoProfanity();
  socketSubscribe();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default init;
