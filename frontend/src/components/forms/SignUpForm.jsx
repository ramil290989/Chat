import React, {useState, useEffect, useRef, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import cn from 'classnames';
import * as Yup from 'yup';
import route from '../../routes';
import { AuthorizationData } from '../../contexts/AuthorizationData.js';

const SignUpForm = () => {
  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  });
  const [authorizationData, setAuthorizationData] = useContext(AuthorizationData);
  const [isDisabled, setIsDisabled] = useState(false);
  const [netError, setNetError] = useState(null);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const notify = (errorMessage) => toast.error(errorMessage);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, t('validations.min3'))
          .max(20, t('validations.max20'))
          .required(t('validations.required')),
        password: Yup.string()
          .min(6, t('validations.min6'))
          .required(t('validations.required')),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], t('validations.oneOf'))
          .required(t('validations.required')),
      })}
      onSubmit={async ({ username, password }) => {
        setIsDisabled(true);
        const loginRoute = route.signup();
        const loginData = { username, password };
        await axios.post(loginRoute, loginData)
          .then((response) => {
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('token', response.data.token);
            setAuthorizationData({ token: response.data.token, username: response.data.username });
            setIsDisabled(false);
            navigate('/');
          })
          .catch((error) => {
            if (error.response.status === 409) {
              setNetError(t('errors.409'));
              setIsDisabled(false);
            } else {
              notify(t('errors.connectionError'));
              setIsDisabled(false);
            }
          });
      }}
    >
      {(formProps) => (
        <Form onSubmit={formProps.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 class="text-center mb-4">{t('headers.signUp')}</h1>
            <Form.FloatingLabel className="mb-3" htmlFor="username" label={t('inputs.username.label')}>
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
                className={cn({'is-invalid': (formProps.errors.username && formProps.touched.username) || netError})}
              />
              {formProps.errors.username && formProps.touched.username ? (
                <div className="invalid-tooltip">{formProps.errors.username}</div>
              ) : null}
          </Form.FloatingLabel>
          <Form.FloatingLabel className="mb-4" htmlFor="password" label={t('inputs.password.label')}>
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
                className={cn({'is-invalid': (formProps.errors.password && formProps.touched.password) || netError})}
              />
              {formProps.errors.password && formProps.touched.password ? (
                <div className="invalid-tooltip">{formProps.errors.password}</div>
              ) : null}
          </Form.FloatingLabel>
          <Form.FloatingLabel className="mb-4" htmlFor="confirmPassword" label={t('inputs.confirmPassword.label')}>
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
                className={cn({'is-invalid': (formProps.errors.confirmPassword && formProps.touched.confirmPassword) || netError})}
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
