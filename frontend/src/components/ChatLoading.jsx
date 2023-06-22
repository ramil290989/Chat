import React from "react";
import { useTranslation } from "react-i18next";

const ChatLoading = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 class="h4 text-muted">{t('loadingStatus.loading')}</h1>
    </div>
  );
};

export default ChatLoading;
