import React from 'react';
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

  const { t } = useTranslation();

  const notify = () => toast.success(t('toastifyNotify.channelRenamed'));

  return (
    <Formik
      initialValues={{
        newName: renameChannelName,
      }}
      validationSchema={Yup.object({
        newName: Yup.string()
          .min(3, t('validations.min3'))
          .max(20, t('validations.max20'))
          .notOneOf(channelNames, t('validations.notOneOf'))
          .required(t('validations.required')),
      })}
      onSubmit={({ newName }) => {
        socketEvents.renameChannel({ id: renameChannelId, name: newName });
        onHide();
        notify();
      }}
    >
      {(formProps) => (
        <form onSubmit={formProps.handleSubmit}>
          <div>
            <input
              id="newName"
              name="newName"
              type="text"
              className={cn('mb-2', 'form-control', { 'is-invalid': formProps.errors.newName })}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
              value={formProps.values.newName}
            />
            <div className="invalid-feedback">{formProps.errors.newName}</div>
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
