import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { useNewChannel } from '../../hooks/socketHooks.js';
import { validationSchemaChannelName } from '../../validationSchemas.js';
import { notifyConnectionErr } from '../notify.jsx';

const AddChannelForm = () => {
  const newChannelName = useRef(null);
  useEffect(() => {
    newChannelName.current.focus();
  }, []);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const newChannel = useNewChannel();

  const channels = useSelector(channelsSelectors.selectAll);
  const channelNames = channels.map((channel) => channel.name);

  const onHide = () => {
    dispatch(modalsActions.modalHide());
  };

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={validationSchemaChannelName(channelNames, t)}
      onSubmit={async ({ name }) => {
        try {
          await newChannel({ name });
          onHide();
        } catch (e) {
          notifyConnectionErr(t('errors.connectionError'));
        }
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
              <button type="submit" className="btn btn-primary" disabled={formProps.isSubmitting}>{t('buttons.send')}</button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AddChannelForm;
