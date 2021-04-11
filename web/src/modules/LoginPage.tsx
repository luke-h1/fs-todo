import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { CustomInput } from '../components/CustomInput';
import { Wrapper } from '../components/Wrapper';
import authContext from '../context/authContext';
import { Spinner } from '../components/Spinner';

export const LoginPage: React.FC<{}> = () => {
  const AuthContext = useContext(authContext);
  const { loading, login } = AuthContext;
  const router = useRouter();

  return (
    <Wrapper>
      {loading && <h1>loading</h1>}
      <h1 className="mt-60">Register</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { email, password } = values;
          await login(email, password);
        }}

      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput name="email" placeholder="email" label="email" />
            <div className="mt-5 mb-5">
              <CustomInput
                name="password"
                placeholder="password"
                label="password"
                type="password"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-8 rounded"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>
            {loading && <Spinner />}
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
