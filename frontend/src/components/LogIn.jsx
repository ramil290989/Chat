import React, {useState, useEffect, useRef, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Formik } from 'formik';
import axios from 'axios';
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import logInImage from '../img/logIn.jpeg';
import route from '../routes';
import { AuthorizationData } from '../contexts/AuthorizationData.js';

const LogIn = () => {
  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  });

  const { t } = useTranslation();

  const notify = (errorMessage) => toast.error(errorMessage);

  const [authorizationData, setAuthorizationData] = useContext(AuthorizationData);

  const [isDisabled, setIsDisabled] = useState(false);
  const [netError, setNetError] = useState(null);
  const navigate = useNavigate();  

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image roundedCircle src={logInImage}></Image>
              </Col>
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
                  axios.post(loginRoute, loginData)
                    .then((response) => {
                      localStorage.setItem('username', response.data.username);
                      localStorage.setItem('token', response.data.token);
                      setAuthorizationData({ token: response.data.token, username: response.data.username });
                      setIsDisabled(false);
                      navigate('/');
                    })
                    .catch((error) => {
                      if (error.response.status === 401) {
                        setNetError(t('errors.401'));
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
                    <h1 class="text-center mb-4">{t('headers.login')}</h1>
                      <Form.FloatingLabel className="mb-3" htmlFor="username" label={t('inputs.login.label')}>
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
                          className={cn({'is-invalid': netError})}
                          disabled={isDisabled}
                          required
                        />
                      </Form.FloatingLabel>
                      <Form.FloatingLabel className="mb-4" htmlFor="password" label={t('inputs.password.label')}>
                        <Form.Control
                          id="password"
                          name="password"
                          type="password"
                          placeholder={t('inputs.password.placeholder')}
                          onChange={formProps.handleChange}
                          onBlur={formProps.handleBlur}
                          value={formProps.values.password}
                          className={cn({'is-invalid': netError})}
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
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('texts.noAccount')}</span> <a href="/signup">{t('links.signUp')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
