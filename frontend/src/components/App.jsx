import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import PageNotFound from './PageNotFound.jsx';
import MainPage from './MainPage.jsx'
import SignUpForm from './SignUpForm.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="" element={<MainPage />} />
      <Route path="login" element={<SignUpForm />} />
    </Routes>
  </BrowserRouter>
);

export default App;
