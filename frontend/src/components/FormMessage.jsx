import React from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {sendMSGService} from "../redux/service";

const Container = styled.div`
  // width: 100%;
  // width: 100%;
  // height: 100vh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;
  // form {
  //   display: flex;
  //   flex-direction: column;
  // }
`;

const AuthSchema = Yup.object().shape({
  msg: Yup.string().required('Required'),
 });

const FormMessage = () => {
  return (
    <Container>
      <Formik
       initialValues={{ msg: '' }}
       validationSchema={AuthSchema}
       onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
          sendMSGService(values).then((respond) => {
            setSubmitting(false);
            resetForm({msg: ''});
          }).catch(() => {
            setSubmitting(false);
          });
       }}
      >
       {({ isSubmitting, errors }) => (
        <Form>
          <div className="form-group mb-3">
            <Field
              name="msg"
              placeholder="Type something"
              type="text"
              className="form-control"
            />
            <ErrorMessage name="msg" component="div" className="text-danger" />
          </div>
          <div className="form-group mb-3">
            <button type="submit" className="btn btn-outline-primary w-100" disabled={isSubmitting}>Send</button>
          </div>
        </Form>
        )}
      </Formik>
    </Container>
  );
}

export default FormMessage
