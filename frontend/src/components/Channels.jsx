import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions, selectors } from '../slices/channelsSlice.js';
import AddChannelModal from './channelsModals/AddChannelModal.jsx';
import RemoveChannelModal from './channelsModals/RemoveChannelModal.jsx';
import RenameChannelModal from './channelsModals/RenameChannelModal.jsx';

const Channels = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const channels = useSelector(selectors.selectAll);
  const channelNames = channels.map((channel) => channel.name);
  const currentChannel = useSelector((state) => state.channels.currentChannel);

  const [addChannelModalShow, setAddChannelModalShow] = useState(false);
  const [removeChannelModalProps, setRemoveChannelModalProps] = useState(false);
  const [renameChannelModalProps, setRenameChannelModalProps] = useState(false);
    
  const ChannelButton = ({ channel }) => {
    const NotRemovable = (
      <Button
          variant={currentChannel.id === channel.id ? 'secondary' : ''}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => {
            dispatch(actions.changeCurrentChannel(channel));
          }}
        >
          <span className="me-1">#</span>{channel.name}
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
          <span className="me-1">#</span>{channel.name}
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
    )
    return( channel.removable ? Removable : NotRemovable );
  }

  return (
    <>
    <Col md={2} xs={4} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('titles.channels')}</b>
        <button
          type="button" className="p-0 text-primary btn btn-group-vertical"
          onClick={() => setAddChannelModalShow(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <ChannelButton channel={channel} />
          </li>
        ))}
      </ul>
    </Col>
    <AddChannelModal
      show={addChannelModalShow}
      onHide={() => setAddChannelModalShow(false)}
      channelNames={channelNames}
    />
    <RemoveChannelModal
      show={removeChannelModalProps.show}
      onHide={() => setRemoveChannelModalProps({ show: false })}
      removeChannelId={removeChannelModalProps.id}
    />
    <RenameChannelModal
      show={renameChannelModalProps.show}
      onHide={() => setRenameChannelModalProps({ show: false })}
      channelNames={channelNames}
      renameChannelId={renameChannelModalProps.id}
      renameChannelName={renameChannelModalProps.name}
    />
    </>
  )
};

export default Channels;
