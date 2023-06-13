import React from "react";
import { Modal, Button } from "react-bootstrap";
import { io } from 'socket.io-client';

const RemoveChannelModal = (props) => {
  const { show, onHide, removeChannelId } = props
  const socket = io("ws://localhost:5001");
  const removeChannel = (channelId) => {
    socket.emit('removeChannel', { id: channelId });
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={() => onHide()}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p class="lead">Уверены?</p>
        <div class="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => onHide()}>Отменить</Button>
          <Button variant="danger" onClick={() => removeChannel(removeChannelId)}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveChannelModal;
