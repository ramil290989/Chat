import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as modalsActions } from '../../slices/modalsSlice';
import RenameChannelForm from '../forms/RenameChannelForm';

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isShow = useSelector((state) => state.modals.window) === 'renameChannel';
  const onHide = () => {
    dispatch(modalsActions.modalHide());
  };

  return (
    <Modal
      show={isShow}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('headers.renameChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameChannelForm />
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
