import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthorizationContext from '../contexts/AuthorizationContext.js';
import { fetchChannels } from '../slices/channelsSlice.js';
import ChatLoading from '../components/ChatLoading.jsx';
import ChatLoadingFailed from '../components/ChatLoadingFailed.jsx';
import Chat from '../components/Chat.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);
  const loadingError = useSelector((state) => state.channels.error);
  const { authorizationData, setAuthorizationData } = useContext(AuthorizationContext);
  const { token } = authorizationData;

  useEffect(() => {
    if (loadingStatus === 'loading') {
      dispatch(fetchChannels(token));
    }
    if (loadingStatus === 'failed' && /401/.test(loadingError.message)) {
      setAuthorizationData({});
      navigate('/login');
    }
  }, [token, dispatch, loadingStatus]);

  switch (loadingStatus) {
    case 'loading':
      return <ChatLoading />;
    case 'failed':
      return <ChatLoadingFailed />;
    case 'idle':
      return <Chat />;
    default:
      return null;
  }
};

export default MainPage;
