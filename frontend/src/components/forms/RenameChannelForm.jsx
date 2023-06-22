import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { socketEvents } from "../../initSocket";

const RenameChannelForm = (props) => {
  const { onHide, channelNames, renameChannelId, renameChannelName } = props;

  const { t } = useTranslation();

  const notify = () => toast.success(t('toastifyNotify.channelRenamed'));

  return (
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
        socketEvents.renameChannel({ id: renameChannelId, name: renameChannelName });
        onHide();
        notify();
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
  );
}

export default RenameChannelForm;
