import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { socketEvents } from '../../initSocket';

const RenameChannelForm = (props) => {
  const {
    onHide, channelNames, renameChannelId, renameChannelName,
  } = props;

  const renameChannel = useRef(null);
  useEffect(() => {
    renameChannel.current.select();
  });

  const { t } = useTranslation();

  const notify = () => toast.success(t('toastifyNotify.channelRenamed'));

  return (
    <Formik
      initialValues={{
        name: renameChannelName,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, t('validations.min3max20'))
          .max(20, t('validations.min3max20'))
          .notOneOf(channelNames, t('validations.notOneOf'))
          .required(t('validations.required')),
      })}
      onSubmit={({ name }) => {
        socketEvents.renameChannel({ id: renameChannelId, name });
        onHide();
        notify();
      }}
    >
      {(formProps) => (
        <form onSubmit={formProps.handleSubmit}>
          <div>
            <input
              ref={renameChannel}
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

export default RenameChannelForm;
