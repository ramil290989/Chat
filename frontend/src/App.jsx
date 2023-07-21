import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthorizationContext from './contexts/AuthorizationContext.js';
import PrivateRoute from './components/PrivateRoute.jsx';
import HeaderNav from './components/HeaderNav.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import MainPage from './pages/MainPage.jsx';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';

const App = () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const [authorizationData, setAuthorizationData] = useState({ username, token });

  return (
    <AuthorizationContext.Provider value={{ authorizationData, setAuthorizationData }}>
      <div className="d-flex flex-column h-100">
        <HeaderNav />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer autoClose={2000} />
      </div>
    </AuthorizationContext.Provider>
  );
};

export default App;
