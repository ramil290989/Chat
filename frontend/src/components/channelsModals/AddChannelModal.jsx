import React from "react";
import { Modal } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {io} from 'socket.io-client';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/channelsSlice.js';

const AddChannelModal = (props) => {
  const { show, onHide, channelNames } = props;
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
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
          }}
          validationSchema={Yup.object({
            channelName: Yup.string()
              .min(3, 'От 3 до 20 символов')
              .max(20, 'От 3 до 20 символов')
              .notOneOf(channelNames, 'Должно быть уникальным')
              .required('Обязательное поле'),
          })}
          onSubmit={({ channelName }) => {
            socket.emit('newChannel', { name: channelName });
            socket.on('newChannel', (payload) => {
              dispatch(actions.changeCurrentChannel(payload));
            });
            onHide();
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
