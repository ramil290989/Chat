import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import HeaderNav from './HeaderNav.jsx';
import PageNotFound from './PageNotFound.jsx';
import MainPage from './MainPage.jsx'
import SignUpForm from './SignUpForm.jsx';

const App = () => (
  <div className="d-flex flex-column h-100">
    <HeaderNav />
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="" element={<MainPage />} />
        <Route path="login" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
