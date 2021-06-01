import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import {registerAccount} from "../redux/service";
import {updateAuthStore} from "../redux/tokenStore";
import {login} from "../redux/userSlice";

const Container = styled.div`
  width: 100%;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
  }
`;

const AuthSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
 });

const SignupPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const isAuthenicated = !isEmpty(user);
  if(isAuthenicated) {
    return <Redirect to="/"/>
  }

  return (
    <Container>
      <h3> Sign Up</h3>
      <Formik
       initialValues={{ username: '', email: '', password: '' }}
       validationSchema={AuthSchema}
       onSubmit={(values, { setSubmitting, setErrors }) => {
          registerAccount(values).then((respond) => {
            setSubmitting(false);
            dispatch(login(respond.data));
            updateAuthStore(respond.data);
          }).catch((err) => {
            setSubmitting(false);
            if (err.response && err.response.data) {
              setErrors(err.response.data.errors);
            }
          });
        }}
      >
       {({ isSubmitting, errors }) => (
        <Form>
          <div className="form-group mb-3">
            <label htmlFor="email">Username</label>
            <Field
              name="username"
              placeholder="Ex: Rathanak 007"
              type="text"
              className="form-control"
            />
            <ErrorMessage name="username" component="div" className="text-danger" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              placeholder="Ex: jane@acme.com"
              type="email"
              className="form-control"
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              className="form-control"
            />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <div className="form-group mb-3">
            <button type="submit" className="btn btn-outline-primary w-100" disabled={isSubmitting}>Submit</button>
          </div>
        </Form>
        )}
      </Formik>
    </Container>
  );
}

export default SignupPage
