import React, { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import SocketContext from '../../contexts/SocketContext.js';
import { validationSchemaChannelName } from '../../validationSchemas.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const RenameChannelForm = () => {
  const renameChannelinput = useRef(null);
  useEffect(() => {
    renameChannelinput.current.select();
  }, []);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { renameChannel } = useContext(SocketContext);

  const channels = useSelector(channelsSelectors.selectAll);
  const channelNames = channels.map((channel) => channel.name);
  const id = useSelector((state) => state.modals.id);
  const oldName = useSelector((state) => state.modals.name);

  const onHide = () => {
    dispatch(modalsActions.modalHide());
  };

  const notifyOk = () => toast.success(t('toastifyNotify.channelRenamed'));
  const notifyErr = () => toast.error(t('errors.connectionError'));

  return (
    <Formik
      initialValues={{
        name: oldName,
      }}
      validationSchema={validationSchemaChannelName(channelNames, t)}
      onSubmit={async ({ name }) => {
        try {
          await renameChannel({ id, name });
          onHide();
          notifyOk();
        } catch (e) {
          notifyErr();
        }
      }}
    >
      {(formProps) => (
        <form onSubmit={formProps.handleSubmit}>
          <div>
            <input
              ref={renameChannelinput}
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
