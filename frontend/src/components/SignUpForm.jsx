import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import route from '../routes';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const ErrMes = (props) => {
  return props.err !== null ? <div>{props.err}</div> : null;
};

const SignUpForm = () => {
  const [errState, setErrState] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: ({ username, password }) => {
      const loginRoute = route.login();
      const loginData = { username, password };
      axios.post(loginRoute, loginData)
        .then((loginResponse) => {
          localStorage.setItem('token', loginResponse.data.token);
          const dataRoute = route.data();
          const dataConfig = { headers: { Authorization: `Bearer ${loginResponse.data.token}` } };
          axios.get(dataRoute, dataConfig)
            .then((dataResponse) => {
              console.log(dataResponse.data);
              const { channels, currentChannelId } = dataResponse.data;
              dispatch(channelsActions.addChannels(channels));
              dispatch(channelsActions.setCurrentChannelId(currentChannelId));
            })
            .catch((er) => console.log('nodata'));
          navigate('/');
        })
        .catch((e) => {
          setErrState(e.message);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="d-grid gap-2">
      <div className="form-group">Имя пользователя</div>
      <input
        id="username"
        name="username"
        type="text"
        className="form-control"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.username && formik.errors.username ? (
        <div>{formik.errors.username}</div>
      ) : null}
      <div className="form-group">Пароль</div>
      <input
        id="password"
        name="password"
        type="password"
        className="form-control"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <Button type="submit" className="btn-primary">Submit</Button>
      <ErrMes err={errState}/>
    </form>
  );
};

export default SignUpForm;
