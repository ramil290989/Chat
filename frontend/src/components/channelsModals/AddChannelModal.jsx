import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AddChannelForm from '../forms/AddChannelForm.jsx';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isShow = useSelector((state) => state.modals.window) === 'addChannel';
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
          {t('headers.addChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
