import React from "react";
import { Modal } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import socket from "../../socket";

const AddChannelModal = (props) => {
  const { show, onHide, channelNames, renameChannelId, renameChannelName } = props;
  const dispatch = useDispatch();

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
        <Formik
          initialValues={{
            renameChannelName,
          }}
          validationSchema={Yup.object({
            renameChannelName: Yup.string()
              .min(3, t('validations.min3'))
              .max(20, t('validations.max20'))
              .notOneOf(channelNames, t('validations.notOneOf'))
              .required(t('validations.required')),
          })}
          onSubmit={({ renameChannelName }) => {
            socket.emit('renameChannel', { id: renameChannelId, name: renameChannelName });
            onHide();
          }}
        >
          {(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <div>
                <input
                  id="renameChannelName"
                  name="renameChannelName"
                  type="text"
                  className={cn('mb-2', 'form-control', {'is-invalid': formProps.errors.renameChannelName})}
                  onChange={formProps.handleChange}
                  onBlur={formProps.handleBlur}
                  value={formProps.values.renameChannelName}
                />
                <div className="invalid-feedback">{formProps.errors.renameChannelName}</div>
                <div className="d-flex justify-content-end">
                  <button className="me-2 btn btn-secondary" onClick={() => onHide()}>{t('buttons.cancel')}</button>
                  <button type="submit" className="btn btn-primary">{t('buttons.send')}</button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default AddChannelModal;
