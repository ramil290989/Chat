import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AddChannelForm from '../forms/AddChannelForm.jsx';

const AddChannelModal = (props) => {
  const { show, onHide, channelNames } = props;

  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={() => onHide()}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('headers.addChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm onHide={onHide} channelNames={channelNames} />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
