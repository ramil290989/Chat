import React from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import NotRemovableButton from './NotRemovableButton';

const RemovableButton = (props) => {
  const {
    currentChannel,
    channel,
    onClick,
    setRemoveChannelModalProps,
    setRenameChannelModalProps,
  } = props;
  const { t } = useTranslation();

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <NotRemovableButton
        currentChannel={currentChannel}
        channel={channel}
        onClick={() => onClick()}
      />
      <Dropdown.Toggle
        split
        variant={currentChannel.id === channel.id ? 'secondary' : ''}
        className="flex-grow-0"
        id="dropdown-split-basic"
      >
        <span className="visually-hidden">{t('buttons.channelControl')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={() => setRemoveChannelModalProps({ show: true, id: channel.id })}>{t('buttons.remove')}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => setRenameChannelModalProps({ show: true, id: channel.id, name: channel.name })}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RemovableButton;
