import React from "react";
import { Modal } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions } from '../../slices/channelsSlice.js';
import socket from "../../socket.js";

const AddChannelModal = (props) => {
  const { show, onHide, channelNames } = props;
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const notify = () => toast.success(t('toastifyNotify.channelAdded'));

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
        <Formik
          initialValues={{
            channelName: '',
          }}
          validationSchema={Yup.object({
            channelName: Yup.string()
              .min(3, t('validations.min3'))
              .max(20, t('validations.max20'))
              .notOneOf(channelNames, t('validations.notOneOf'))
              .required(t('validations.required')),
          })}
          onSubmit={({ channelName }) => {
            socket.emit('newChannel', { name: channelName });
            socket.on('newChannel', (payload) => {
              dispatch(actions.changeCurrentChannel(payload));
            });
            onHide();
            notify();
          }}
        >
          {(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <div>
                <input
                  id="channelName"
                  name="channelName"
                  type="text"
                  className={cn('mb-2', 'form-control', {'is-invalid': formProps.errors.channelName})}
                  onChange={formProps.handleChange}
                  onBlur={formProps.handleBlur}
                  value={formProps.values.channelName}
                />
                <div className="invalid-feedback">{formProps.errors.channelName}</div>
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
