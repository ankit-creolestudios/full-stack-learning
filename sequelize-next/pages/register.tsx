import { getSession } from 'next-auth/react';
import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div>
      register
      <div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
export const getServerSideProps = async (ctx: any) => {
  const session = await getSession({ req: ctx.req });

  //   if (session) {
  //     return {
  //       redirect: {
  //         destination: '/',
  //         permanent: false,
  //       },
  //     };
  //   }
  return {
    props: {
      session,
    },
  };
};
