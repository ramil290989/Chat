import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import cn from 'classnames';
import { notifyConnectionErr } from '../notify.jsx';
import AuthorizationContext from '../../contexts/AuthorizationContext.js';
import route from '../../routes.js';

const LogInForm = () => {
  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const [isDisabled, setIsDisabled] = useState(false);
  const [netError, setNetError] = useState(null);

  const { setAuthorizationData } = useContext(AuthorizationContext);

  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async ({ username, password }) => {
        setIsDisabled(true);
        setNetError(null);
        const loginRoute = route.login();
        const loginData = { username, password };
        await axios.post(loginRoute, loginData)
          .then(({ data }) => {
            localStorage.setItem('username', data.username);
            localStorage.setItem('token', data.token);
            setAuthorizationData({ username: data.username, token: data.token });
            navigate('/');
          })
          .catch((error) => {
            if (error.response.status === 401) {
              setNetError(t('errors.401'));
            } else {
              notifyConnectionErr(t('errors.connectionError'));
            }
          })
          .finally(() => {
            setIsDisabled(false);
          });
      }}
    >
      {(formProps) => (
        <Form onSubmit={formProps.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('headers.login')}</h1>
          <Form.FloatingLabel className="mb-3" controlId="username" label={t('inputs.login.label')}>
            <Form.Control
              ref={usernameInput}
              id="username"
              name="username"
              type="text"
              placeholder={t('inputs.login.placeholder')}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
              ontou
              value={formProps.values.username}
              className={cn({ 'is-invalid': netError })}
              disabled={isDisabled}
              required
            />
          </Form.FloatingLabel>
          <Form.FloatingLabel className="mb-4" controlId="password" label={t('inputs.password.label')}>
            <Form.Control
              id="password"
              name="password"
              type="password"
              placeholder={t('inputs.password.placeholder')}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
              value={formProps.values.password}
              className={cn({ 'is-invalid': netError })}
              disabled={isDisabled}
              required
            />
            {netError ? (
              <div className="invalid-tooltip">{netError}</div>
            ) : null}
          </Form.FloatingLabel>
          <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={isDisabled}>{t('buttons.logIn')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default LogInForm;
