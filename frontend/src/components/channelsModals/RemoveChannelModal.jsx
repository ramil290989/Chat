import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { socketEvents } from '../../initSocket';

const RemoveChannelModal = (props) => {
  const { show, onHide, removeChannelId } = props;

  const { t } = useTranslation();

  const notify = () => toast.success(t('toastifyNotify.channelRemoved'));

  const removeChannel = (channelId) => {
    socketEvents.removeChannel({ id: channelId });
    onHide();
    notify();
  };

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
        <p className="lead">{t('titles.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => onHide()}>{t('buttons.cancel')}</Button>
          <Button variant="danger" onClick={() => removeChannel(removeChannelId)}>{t('buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
