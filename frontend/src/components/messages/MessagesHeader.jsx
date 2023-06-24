import React from 'react';
import { useTranslation } from 'react-i18next';

const MessagesHeader = (props) => {
  const { currentChannel, currentChannelMessages } = props;
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {currentChannel.name}
        </b>
      </p>
      <span className="text-muted">{t('titles.messagesInfo.message', { count: currentChannelMessages.length })}</span>
    </div>
  );
};

export default MessagesHeader;
