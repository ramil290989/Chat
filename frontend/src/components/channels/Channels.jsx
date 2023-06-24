import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { selectors } from '../../slices/channelsSlice.js';
import ChannelsHeader from './ChannelsHeader.jsx';
import ChannelsList from './ChannelsList.jsx';
import AddChannelModal from '../channelsModals/AddChannelModal.jsx';
import RemoveChannelModal from '../channelsModals/RemoveChannelModal.jsx';
import RenameChannelModal from '../channelsModals/RenameChannelModal.jsx';

const Channels = () => {
  const channels = useSelector(selectors.selectAll);
  const channelNames = channels.map((channel) => channel.name);

  const [addChannelModalShow, setAddChannelModalShow] = useState(false);
  const [removeChannelModalProps, setRemoveChannelModalProps] = useState(false);
  const [renameChannelModalProps, setRenameChannelModalProps] = useState(false);

  return (
    <>
      <Col md={2} xs={4} className="border-end px-0 bg-light flex-column h-100 d-flex">
        <ChannelsHeader
          setAddChannelModalShow={setAddChannelModalShow}
        />
        <ChannelsList
          channels={channels}
          setRemoveChannelModalProps={setRemoveChannelModalProps}
          setRenameChannelModalProps={setRenameChannelModalProps}
        />
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
  );
};

export default Channels;
