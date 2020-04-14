import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

import { log_validationSchema } from '../../Component/validation';

export default function Login() {
  const history = useHistory();
  const [message, setMessage] = useState(null);
  //const [user, setUser] = useState(null);

  //const token = localStorage.getItem('token');

  return (
    <div>
      {message && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={log_validationSchema}
        onSubmit={(data, { isSubmitting }) => {
          isSubmitting = true;
          //async call

          Axios.post('http://localhost:5000/api/user/login', data)
            .then((response) => {
              console.log('from login', response);
              const { token } = response.data;
              localStorage.setItem('token', token);
              // setUser(user);
              setMessage('sucess');
              isSubmitting = false;
              console.log('from login', token);
              history.push('/');
            })
            .catch((error) => {
              const message = error.response.data.Message;
              if (message === 'wrong email/password combination') {
                setMessage('wrong email/password combination');
              } else if (message === 'Error executing MySQL query') {
                setMessage('Error executing MySQL query');
              } else {
                setMessage('Other Error');
              }
            });
          console.log(data);
        }}
      >
        {({ values, errors, isSubmitting, touched }) => (
          <Form>
            {/* <input
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
      /> */}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="text"
                className={
                  'form-control' +
                  (errors.email && touched.email ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className={
                  'form-control' +
                  (errors.password && touched.password ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <button
                // disabled={isSubmitting}
                type="submit"
                className="btn btn-primary mr-2"
              >
                Sign In
              </button>
              <button
                // disabled={isSubmitting}
                type="reset"
                className="btn btn-secondary"
              >
                Reset
              </button>
            </div>
            {/* 
      <button disabled={isSubmitting} type="submit">
        Submit
      </button> */}
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <pre>{JSON.stringify(message, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
