import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import socket from "../../initSocket.js";

const RemoveChannelModal = (props) => {
  const { show, onHide, removeChannelId } = props;

  const notify = () => toast.success(t('toastifyNotify.channelRemoved'));

  const removeChannel = (channelId) => {
    socket.emit('removeChannel', { id: channelId });
    onHide();
    notify();
  };

  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={() => onHide()}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('headers.removeChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p class="lead">{t('titles.sure')}</p>
        <div class="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => onHide()}>{t('buttons.cancel')}</Button>
          <Button variant="danger" onClick={() => removeChannel(removeChannelId)}>{t('buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveChannelModal;
