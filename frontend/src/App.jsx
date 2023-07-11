import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthorizationData from './contexts/AuthorizationData.js';
import HeaderNav from './components/HeaderNav.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import MainPage from './pages/MainPage.jsx';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';

const App = () => {
  const { username, token } = localStorage;
  const [authorizationData, setAuthorizationData] = useState({ username, token });

  return (
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
  );
};

export default App;
