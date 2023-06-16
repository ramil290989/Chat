import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';
import logInImage from '../img/logIn.jpeg';
import route from '../routes';

const LogIn = () => {
  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  });

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
                      setIsDisabled(false);
                      navigate('/');
                    })
                    .catch((error) => {
                      const netErrorMessage = error.response.status === 401 ? 'Неверный логин или пароль' : 'Ошибка соединения';
                      setNetError(netErrorMessage);
                      setIsDisabled(false);
                    });
                }}
              >
                {(formProps) => (
                  <Form onSubmit={formProps.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 class="text-center mb-4">Войти</h1>
                      <Form.FloatingLabel className="mb-3" htmlFor="username" label="Ваш ник">
                        <Form.Control
                          ref={usernameInput}
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Ваш ник"
                          onChange={formProps.handleChange}
                          onBlur={formProps.handleBlur}
                          ontou
                          value={formProps.values.username}
                          className={cn({'is-invalid': netError})}
                          disabled={isDisabled}
                          required
                        />
                      </Form.FloatingLabel>
                      <Form.FloatingLabel className="mb-4" htmlFor="password" label="Пароль">
                        <Form.Control
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Пароль"
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
                    <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={isDisabled}>Войти</Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
