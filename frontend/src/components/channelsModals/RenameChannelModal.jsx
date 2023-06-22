import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import RenameChannelForm from "../forms/RenameChannelForm";

const RenameChannelModal = (props) => {
  const { show, onHide, channelNames, renameChannelId, renameChannelName } = props;

  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={() => onHide()}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('headers.renameChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameChannelForm
          onHide={onHide}
          channelNames={channelNames}
          renameChannelId={renameChannelId}
          renameChannelName={renameChannelName}
        />
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannelModal;
