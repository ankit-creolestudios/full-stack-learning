import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import React, { useState } from 'react';

const RegisterForm = () => {
  const validation = yup.object({
    firstName: yup.string().required(''),
    lastName: yup.string().required(''),
    email: yup.string().required(''),
    phone: yup.string().required(''),
    dateofbirth: yup.string().required(''),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      )
      .required(''),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Re-type your paswword'),
  });
  const [initailState, setInitialState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateofbirth: '',
    password: '',
    confirmPassword: '',
  });
  return (
    <>
      <Formik
        initialValues={initailState}
        onSubmit={async (values) => {
          console.log(values);
          const res = await axios
            .post('http://localhost:4000/api/v1/auth/register', {
              ...values,
            })
            .then((res) => alert('register'))
            .catch((err) => console.log(err));
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className="form-field">
              <div>
                <label htmlFor="firstName">First Name</label>
              </div>
              <Field id="firstName" name="firstName" placeholder="John" />
            </div>
            <div className="form-field">
              <div>
                <label htmlFor="lastName">Last Name</label>
              </div>
              <Field id="lastName" name="lastName" placeholder="Doe" />
            </div>
            <div className="form-field">
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <Field
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
              />
            </div>
            <div className="form-field">
              <div>
                <label>Mobile number</label>
              </div>
              <Field
                id="phone"
                name="phone"
                placeholder="enter your mobile number"
              />
            </div>
            <div className="form-field">
              <div>
                <label>Password</label>
              </div>
              <Field
                id="password"
                name="password"
                placeholder="enter your password"
              />
            </div>
            <div className="form-field">
              <div>
                <label>Confirm Password</label>
              </div>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                placeholder="enter your password"
              />
            </div>
            <div className="form-submit">
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
