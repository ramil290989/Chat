import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRemoveChannel } from '../../hooks/socketHooks.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { notifyConnectionErr } from '../notify.jsx';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const removeChannel = useRemoveChannel();

  const isShow = useSelector((state) => state.modals.window) === 'removeChannel';
  const onHide = () => {
    dispatch(modalsActions.modalHide());
  };

  const id = useSelector((state) => state.modals.id);

  const remove = async () => {
    try {
      await removeChannel({ id });
      onHide();
    } catch (e) {
      notifyConnectionErr(t('errors.connectionError'));
    }
  };

  return (
    <Modal
      show={isShow}
      onHide={onHide}
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
          <Button variant="danger" onClick={() => remove()}>{t('buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
