// /src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Profile.css'; // 선택사항

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // localStorage 등에 저장된 userId, email, nickname 가져오기
    const savedUserId = localStorage.getItem('userId');
    const savedEmail = localStorage.getItem('email');
    const savedNickname = localStorage.getItem('nickname');
    
    if (savedUserId) {
      // 로그인된 상태
      setUser({
        id: savedUserId,
        email: savedEmail,
        nickname: savedNickname,
      });
    } else {
      // 비로그인 상태
      setUser(null);
    }
  }, []);

  // 로그인 버튼 클릭 시 → /login 이동
  const handleLogin = () => {
    navigate('/login');
  };

  // 회원가입 버튼 클릭 시 → /register 이동
  const handleRegister = () => {
    navigate('/register');
  };

  // 로그아웃 버튼 클릭 시 → localStorage 초기화 + 상태 업데이트
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('nickname');
    setUser(null);
  };

  // 1) 비로그인 화면
  if (!user) {
    return (
      <div className="profile-container">
        <h2>마이페이지</h2>
        <div className="not-logged-in">
          <p>로그인이 필요합니다.</p>
          <button onClick={handleLogin}>로그인</button>
          <button onClick={handleRegister}>회원가입</button>
        </div>
      </div>
    );
  }

  // 2) 로그인된 화면
  return (
    <div className="profile-container">
      <h2>설정</h2>
      <div className="profile-info">
        <div className="info-row">
          <span className="label">닉네임</span>
          <span className="value">{user.nickname}</span>
        </div>
        <div className="info-row">
          <span className="label">계정</span>
          <span className="value">{user.email}</span>
        </div>
      </div>

      <ul className="menu-list">
        <li>
          <button>비밀번호 변경</button>
        </li>
        <li>
          <button>정기 결제 관리</button>
        </li>
        <li>
          <button>약관 및 이용동의</button>
        </li>
        <li>
          <button>회원탈퇴</button>
        </li>
        <li>
          <button onClick={handleLogout}>로그아웃</button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;