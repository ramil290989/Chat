import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import SocketContext from '../../contexts/SocketContext.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { removeChannel } = useContext(SocketContext);

  const notifyOk = () => toast.success(t('toastifyNotify.channelRemoved'));
  const notifyErr = () => toast.error(t('errors.connectionError'));

  const isShow = useSelector((state) => state.modals.window) === 'removeChannel';
  const onHide = () => {
    dispatch(modalsActions.modalHide());
  };

  const id = useSelector((state) => state.modals.id);

  const remove = async () => {
    try {
      await removeChannel({ id });
      onHide();
      notifyOk();
    } catch (e) {
      notifyErr();
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
