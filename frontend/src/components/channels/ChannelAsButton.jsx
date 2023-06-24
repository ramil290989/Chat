import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../../slices/channelsSlice.js';

const ChannelAsButton = (props) => {
  const { channel, setRemoveChannelModalProps, setRenameChannelModalProps } = props;
  const currentChannel = useSelector((state) => state.channels.currentChannel);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const NotRemovable = (
    <Button
      variant={currentChannel.id === channel.id ? 'secondary' : ''}
      className="w-100 rounded-0 text-start text-truncate"
      onClick={() => {
        dispatch(actions.changeCurrentChannel(channel));
      }}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );

  const Removable = (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        variant={currentChannel.id === channel.id ? 'secondary' : ''}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => {
          dispatch(actions.changeCurrentChannel(channel));
        }}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle
        split
        variant={currentChannel.id === channel.id ? 'secondary' : ''}
        className="flex-grow-0"
        id="dropdown-split-basic"
      />
      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={() => setRemoveChannelModalProps({ show: true, id: channel.id })}>{t('buttons.remove')}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => setRenameChannelModalProps({ show: true, id: channel.id, name: channel.name })}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  return (channel.removable ? Removable : NotRemovable);
};

export default ChannelAsButton;
