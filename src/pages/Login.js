import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h2>로그인</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;