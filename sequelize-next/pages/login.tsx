import { getSession } from 'next-auth/react';
import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div>
      login
      <div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
export const getServerSideProps = async (ctx: any) => {
  const session = await getSession({ req: ctx.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
