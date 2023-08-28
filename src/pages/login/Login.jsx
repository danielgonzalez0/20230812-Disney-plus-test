import React from 'react';
import SignUp from '../../components/loginSection/SignUp';
import { useSelector } from 'react-redux';
import Home from '../home/Home';

const Login = () => {
  const user = useSelector((state) => state.user);
  
  if (user.name) return <Home />;

  return (
    <>
      <SignUp />
    </>
  );
};

export default Login;
