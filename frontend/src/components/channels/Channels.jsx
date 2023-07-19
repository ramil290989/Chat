import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import ChannelsHeader from './ChannelsHeader.jsx';
import ChannelsList from './ChannelsList.jsx';
import ModalWindow from '../channelsModals/ModalWindow.jsx';

const Channels = () => {
  const modalWindow = useSelector((state) => state.modals.window);

  return (
    <>
      <Col md={2} xs={4} className="border-end px-0 bg-light flex-column h-100 d-flex">
        <ChannelsHeader />
        <ChannelsList />
      </Col>
      {modalWindow && <ModalWindow window={modalWindow} />}
    </>
  );
};

export default Channels;
