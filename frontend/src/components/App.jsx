import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthorizationData } from '../contexts/AuthorizationData.js';
import HeaderNav from './HeaderNav.jsx';
import PageNotFound from './PageNotFound.jsx';
import MainPage from './MainPage.jsx'
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import { Provider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';

const rollbarConfig = {
  accessToken: 'fe5326e87ba64a50a587c0b31fd4f69c',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

function ErrorDisplay({ error, resetError }) {
  return (
    <div>
      {`ошибочка: ${error.message}`}
      <button type="button" onClick={() => resetError()}>Сброс</button>
    </div>
  );
}

const App = () => {
  const { username, token } = localStorage;
  const [authorizationData, setAuthorizationData] = useState({ username, token });
  
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorDisplay}>
        <AuthorizationData.Provider value={[authorizationData, setAuthorizationData]}>
          <div className="d-flex flex-column h-100">
            <HeaderNav />
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route path="/" element={authorizationData.token ? <MainPage /> : <LogIn />} />
                <Route path="login" element={<LogIn />} />
                <Route path="signup" element={<SignUp />} />
              </Routes>
            </BrowserRouter>
            <ToastContainer autoClose={2000} />
          </div>
        </AuthorizationData.Provider>
    </ErrorBoundary>
    </Provider>
  );
}

export default App;
