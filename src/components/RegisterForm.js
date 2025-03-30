import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: '', password: '', nickname: '' });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const user = await api.registerUser(userData);
          console.log('회원가입 성공:', user);
          // 회원가입 성공 후 로그인 페이지로 이동
          navigate('/login');
      } catch (err) {
          console.error('회원가입 에러:', err);
          setError('회원가입 실패: 이미 존재하는 이메일일 수 있습니다.');
      }
  };

  return (
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label>이메일</label>
              <input 
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
          </div>
          <div className="form-group">
              <label>비밀번호</label>
              <input 
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
          </div>
          <div className="form-group">
              <label>닉네임</label>
              <input 
                type="text"
                name="nickname"
                value={userData.nickname}
                onChange={handleChange}
                required
              />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">회원가입</button>
      </form>
  );
};

export default RegisterForm;