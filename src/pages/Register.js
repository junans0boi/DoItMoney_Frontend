import React from 'react';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h2>회원가입</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;