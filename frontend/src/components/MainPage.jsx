import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const MainPage = () => {

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <div className="m-3">This Main Page</div>
      <div className="m-3">userData</div>
      <button>диспатч</button>
      <button onClick={() => localStorage.removeItem('token')}>удалить токен нахуй</button>
      <button onClick={() => axios.post('/api/v1/signup', { username: 'admin', password: 'admin' })}>admin</button>
    </div>
  );
};

export default MainPage;
