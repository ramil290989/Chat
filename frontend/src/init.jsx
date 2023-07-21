import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SocketProvider from './providers/SocketProvider.jsx';
import initI18n from './initI18n.js';
import initLeoProfanity from './initLeoProfanity.js';
import rollbarConfig from './rollbarConfig.js';
import store from './slices/index.js';
import App from './App.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

const init = async () => {
  await initI18n();
  initLeoProfanity();

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={PageNotFound}>
        <Provider store={store}>
          <SocketProvider>
            <App />
          </SocketProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
