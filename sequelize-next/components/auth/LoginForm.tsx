import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import * as yup from 'yup';
import React, { useState } from 'react';

const LoginForm = () => {
  const router = useRouter();
  console.log(router);
  const validation = yup.object({
    email: yup.string().required(''),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      )
      .required(''),
  });
  const [initailState, setInitialState] = useState({
    email: '',
    password: '',
  });
  return (
    <>
      <Formik
        initialValues={initailState}
        onSubmit={async (values) => {
          const result = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
          });
          if (result?.ok) {
            router.push('/');
          }
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
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
                <label>Password</label>
              </div>
              <Field
                id="password"
                name="password"
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

export default LoginForm;
