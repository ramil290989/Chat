import React from "react";
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import cn from 'classnames';
import { actions } from '../../slices/channelsSlice.js';
import { socket, socketEvents } from '../../initSocket.js';

const AddChannelForm = (props) => {
  const { onHide, channelNames } = props;
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const notify = () => toast.success(t('toastifyNotify.channelAdded'));

  return (
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
        socketEvents.newChannel({ name: channelName });
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
  );
}

export default AddChannelForm;
