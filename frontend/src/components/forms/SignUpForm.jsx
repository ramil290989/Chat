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
import route from '../../routes.js';
import AuthorizationContext from '../../contexts/AuthorizationContext.js';
import { validationSchemaSignUp } from '../../validationSchemas.js';

const SignUpForm = () => {
  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, []);
  const [isDisabled, setIsDisabled] = useState(false);
  const [netError, setNetError] = useState(null);
  const navigate = useNavigate();
  const { setAuthorizationData } = useContext(AuthorizationContext);

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchemaSignUp(t)}
      onSubmit={async ({ username, password }) => {
        setIsDisabled(true);
        const loginRoute = route.signup();
        const loginData = { username, password };
        await axios.post(loginRoute, loginData)
          .then(({ data }) => {
            localStorage.setItem('username', data.username);
            localStorage.setItem('token', data.token);
            setAuthorizationData({ username: data.username, token: data.token });
            setIsDisabled(false);
            navigate('/');
          })
          .catch((error) => {
            if (error.response.status === 409) {
              setNetError(t('errors.409'));
              setIsDisabled(false);
            } else {
              notifyConnectionErr(t('errors.connectionError'));
              setIsDisabled(false);
            }
          });
      }}
    >
      {(formProps) => (
        <Form onSubmit={formProps.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('headers.signUp')}</h1>
          <Form.FloatingLabel className="mb-3" controlId="username" label={t('inputs.username.label')}>
            <Form.Control
              ref={usernameInput}
              id="username"
              name="username"
              type="text"
              placeholder={t('inputs.username.placeholder')}
              required
              disabled={isDisabled}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
              value={formProps.values.username}
              className={cn({ 'is-invalid': (formProps.errors.username && formProps.touched.username) || netError })}
            />
            {formProps.errors.username && formProps.touched.username ? (
              <div className="invalid-tooltip">{formProps.errors.username}</div>
            ) : null}
          </Form.FloatingLabel>
          <Form.FloatingLabel className="mb-4" controlId="password" label={t('inputs.password.label')}>
            <Form.Control
              id="password"
              name="password"
              type="password"
              placeholder={t('inputs.password.placeholder')}
              required
              disabled={isDisabled}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
              value={formProps.values.password}
              className={cn({ 'is-invalid': (formProps.errors.password && formProps.touched.password) || netError })}
            />
            {formProps.errors.password && formProps.touched.password ? (
              <div className="invalid-tooltip">{formProps.errors.password}</div>
            ) : null}
          </Form.FloatingLabel>
          <Form.FloatingLabel className="mb-4" controlId="confirmPassword" label={t('inputs.confirmPassword.label')}>
            <Form.Control
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder={t('inputs.confirmPassword.placeholder')}
              required
              disabled={isDisabled}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
              value={formProps.values.confirmPassword}
              className={cn({ 'is-invalid': (formProps.errors.confirmPassword && formProps.touched.confirmPassword) || netError })}
            />
            {(formProps.errors.confirmPassword && formProps.touched.confirmPassword) || netError ? (
              <div className="invalid-tooltip">{formProps.errors.confirmPassword ?? netError}</div>
            ) : null}
          </Form.FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
            disabled={isDisabled}
          >
            {t('buttons.signUp')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
