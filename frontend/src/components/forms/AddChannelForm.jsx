import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import cn from 'classnames';
import { actions } from '../../slices/channelsSlice.js';
import { socket, socketEvents } from '../../initSocket.js';
import { validationSchemaChannelName } from '../../validationSchemas.js';

const AddChannelForm = (props) => {
  const { onHide, channelNames } = props;
  const dispatch = useDispatch();

  const newChannelName = useRef(null);
  useEffect(() => {
    newChannelName.current.focus();
  });

  const { t } = useTranslation();

  const notify = () => toast.success(t('toastifyNotify.channelAdded'));

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={validationSchemaChannelName(channelNames, t)}
      onSubmit={({ name }) => {
        socketEvents.newChannel({ name });
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
              ref={newChannelName}
              id="name"
              name="name"
              type="text"
              className={cn('mb-2', 'form-control', { 'is-invalid': formProps.errors.name })}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
              value={formProps.values.name}
            />
            <label className="visually-hidden" htmlFor="name">{t('inputs.channelName.label')}</label>
            <div className="invalid-feedback">{formProps.errors.name}</div>
            <div className="d-flex justify-content-end">
              <button className="me-2 btn btn-secondary" type="button" onClick={() => onHide()}>{t('buttons.cancel')}</button>
              <button type="submit" className="btn btn-primary">{t('buttons.send')}</button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AddChannelForm;
