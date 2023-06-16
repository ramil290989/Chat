import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';
import signUpImage from '../img/signUp.jpg';
import route from '../routes';

const SignUp = () => {
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
                <Image roundedCircle src={signUpImage}></Image>
              </Col>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={Yup.object({
                  username: Yup.string()
                    .min(3, 'От 3 до 20 символов')
                    .max(20, 'От 3 до 20 символов')
                    .required('Обязательное поле'),
                  password: Yup.string()
                    .min(6, 'Не менее 6 символов')
                    .required('Обязательное поле'),
                  confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
                    .required('Обязательное поле'),
                })}
                onSubmit={async ({ username, password }) => {
                  setIsDisabled(true);
                  const loginRoute = route.signup();
                  const loginData = { username, password };
                  axios.post(loginRoute, loginData)
                    .then((response) => {
                      localStorage.setItem('username', response.data.username);
                      localStorage.setItem('token', response.data.token);
                      navigate('/');
                    })
                    .catch((error) => {
                      const netErrorMessage = error.response.status === 409 ? 'Такой пользователь уже существует' : 'Ошибка соединения';
                      setNetError(netErrorMessage);
                      setIsDisabled(false);
                    });
                }}
              >
                {(formProps) => (
                  <Form onSubmit={formProps.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 class="text-center mb-4">Регистрация</h1>
                      <Form.FloatingLabel className="mb-3" htmlFor="username" label="Имя пользователя">
                        <Form.Control
                          ref={usernameInput}
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Имя пользователя"
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
                    <Form.FloatingLabel className="mb-4" htmlFor="password" label="Пароль">
                        <Form.Control
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Пароль"
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
                    <Form.FloatingLabel className="mb-4" htmlFor="confirmPassword" label="Подтвердите пароль">
                        <Form.Control
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Подтвердите пароль"
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
                      Зарегистрироваться
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
