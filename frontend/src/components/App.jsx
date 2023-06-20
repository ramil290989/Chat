import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import React, { useState } from 'react';
import { AuthorizationData } from '../contexts/AuthorizationData.js';
import HeaderNav from './HeaderNav.jsx';
import PageNotFound from './PageNotFound.jsx';
import MainPage from './MainPage.jsx'
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';

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
      </div>
    </AuthorizationData.Provider>
  );
}

export default App;
