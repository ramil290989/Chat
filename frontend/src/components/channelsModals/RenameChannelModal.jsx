import React from "react";
import { Modal } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {io} from 'socket.io-client';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

const AddChannelModal = (props) => {
  const { show, onHide, channelNames, renameChannelId, renameChannelName } = props;
  const dispatch = useDispatch();
  const socket = io("ws://localhost:5001");

  return (
    <Modal
      show={show}
      onHide={() => onHide()}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Переименовать канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            renameChannelName,
          }}
          validationSchema={Yup.object({
            renameChannelName: Yup.string()
              .min(3, 'От 3 до 20 символов')
              .max(20, 'От 3 до 20 символов')
              .notOneOf(channelNames, 'Должно быть уникальным')
              .required('Обязательное поле'),
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
                  <button className="me-2 btn btn-secondary" onClick={() => onHide()}>Отменить</button>
                  <button type="submit" className="btn btn-primary">Отправить</button>
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
