import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import {loginService} from "../redux/service";
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
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
 });

const SigninPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const isAuthenicated = !isEmpty(user);
  if(isAuthenicated) {
    return <Redirect to="/"/>
  }

  return (
    <Container>
      <h3> Sign In</h3>
      <Formik
       initialValues={{ email: '', password: '' }}
       validationSchema={AuthSchema}
       onSubmit={(values, { setSubmitting, setErrors }) => {
          loginService(values).then((respond) => {
            setSubmitting(false);
            dispatch(login(respond.data));
            updateAuthStore(respond.data);
          }).catch(() => {
            setSubmitting(false);
            setErrors({email_password: 'Invalid email or password '});
            // dispatch(incrementAsync(Number(incrementAmount) || 0))
          });
       }}
      >
       {({ isSubmitting, errors }) => (
        <Form>
          {
            errors && errors.email_password &&
            <div className="text-danger text-center mb-3">
              {errors.email_password}
            </div>
          }
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="Ex: jane@acme.com"
              type="email"
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              className="form-control"
            />
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

export default SigninPage
