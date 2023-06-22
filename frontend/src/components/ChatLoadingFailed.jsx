import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

const ChatLoadingFailed = () => {
  const { t } = useTranslation();

  const notify = (errorMessage) => toast.error(errorMessage);
  notify(t('errors.connectionError'));

  return (
    <div className="text-center">
      <h1 class="h4 text-muted">{t('loadingStatus.failed')}</h1>
    </div>
  );
};

export default ChatLoadingFailed;
