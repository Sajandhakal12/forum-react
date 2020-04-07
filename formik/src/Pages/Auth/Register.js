import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';
import { reg_validationSchema } from '../../Component/validation';

export default function Register() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        // validate={(values) => {
        //   const errors = {};
        //   if (values.firstName.includes('bob')) {
        //     errors.firstName = 'no bob';
        //   }
        //   return errors;
        // }}
        validationSchema={reg_validationSchema}
        onSubmit={(data, { isSubmitting }) => {
          isSubmitting = true;
          //async call
          Axios.post('http://localhost:5000/api/user/register', data);
          console.log(data);
          isSubmitting = false;
        }}
      >
        {({ values, errors, isSubmitting, status, touched }) => (
          <Form>
            {/* <input
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field
                name="firstName"
                type="text"
                className={
                  'form-control' +
                  (errors.firstName && touched.firstName ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field
                name="lastName"
                type="text"
                className={
                  'form-control' +
                  (errors.lastName && touched.lastName ? ' is-invalid' : '')
                }
                error={errors.lastName}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="invalid-feedback"
              />
            </div>
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
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className={
                  'form-control' +
                  (errors.confirmPassword && touched.confirmPassword
                    ? ' is-invalid'
                    : '')
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary mr-2"
              >
                Register
              </button>
              <button
                disabled={isSubmitting}
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
