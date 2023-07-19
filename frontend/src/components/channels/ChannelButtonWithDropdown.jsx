import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as modalsActions } from '../../slices/modalsSlice';
import ChannelButton from './ChannelButton';

const ChannelButtonWithDropdown = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentChannel = useSelector((state) => state.channels.currentChannel);

  const onShowRemoveChannelModal = () => {
    dispatch(modalsActions.modalShow({ window: 'removeChannel', id: channel.id }));
  };
  const onShowRenameChannelIdModal = () => {
    dispatch(modalsActions.modalShow({ window: 'renameChannel', id: channel.id, name: channel.name }));
  };

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <ChannelButton channel={channel} />
      <Dropdown.Toggle
        split
        variant={currentChannel.id === channel.id ? 'secondary' : ''}
        className="flex-grow-0"
        id="dropdown-split-basic"
      >
        <span className="visually-hidden">{t('buttons.channelControl')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={() => onShowRemoveChannelModal()}>{t('buttons.remove')}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => onShowRenameChannelIdModal()}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelButtonWithDropdown;
