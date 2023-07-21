import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatLoadingFailed = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('loadingStatus.failed')}</h1>
    </div>
  );
};

export default ChatLoadingFailed;
