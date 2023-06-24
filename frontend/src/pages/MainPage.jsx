import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorizationData } from '../contexts/AuthorizationData.js';
import { fetchChannels } from '../slices/channelsSlice.js';
import ChatLoading from '../components/ChatLoading.jsx';
import ChatLoadingFailed from '../components/ChatLoadingFailed.jsx';
import Chat from '../components/Chat.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);
  const [authorizationData] = useContext(AuthorizationData);

  useEffect(() => {
    if (loadingStatus === 'loading') {
      dispatch(fetchChannels(authorizationData.token));
    }
  });

  switch (loadingStatus) {
    case 'loading':
      return <ChatLoading />;
    case 'failed':
      return <ChatLoadingFailed />;
    case 'idle':
      return <Chat />;
    default:
      throw new Error();
  }
};

export default MainPage;
