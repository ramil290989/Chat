import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { AuthorizationData } from '../contexts/AuthorizationData.js';
import { fetchChannels } from '../slices/channelsSlice.js';

const MainPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const loadingStatus = useSelector((state) => state.channels.loadingStatus);
  const [authorizationData] = useContext(AuthorizationData);

  useEffect(() => {
    if (loadingStatus === 'loading') {
      dispatch(fetchChannels(authorizationData.token));
    }
  }, [loadingStatus]);

  if (loadingStatus === 'loading') {
    return (
      <div className="text-center">
        <h1 class="h4 text-muted">{t('loadingStatus.loading')}</h1>
      </div>
    );
  }

  if (loadingStatus === 'failed') {
    return (
      <div className="text-center">
        <h1 class="h4 text-muted">{t('loadingStatus.failed')}</h1>
      </div>
    );
  }
  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />    
          <Messages />
        </div>
      </div>
    </>
  )
};

export default MainPage;
