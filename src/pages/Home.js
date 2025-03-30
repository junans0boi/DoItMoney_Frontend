// /src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import NewsCarousel from '../components/NewsCarousel';

import './css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      {/* 뉴스 슬라이더 추가 */}
      <NewsCarousel />
      <div className="content-area">
        {/* 첫 번째 카드 */}
        <div className="card">
          <h3>20대 초반 남성 상위 10%는 투자를 많이 해요</h3>

          {/* 진행도 막대 예시 */}
          <div className="progress-bar">
            <div className="progress-segment" style={{ width: '26%', backgroundColor: '#4CAF50' }}>
              투자 26%
            </div>
            <div className="progress-segment" style={{ width: '31%', backgroundColor: '#2196F3' }}>
              계좌·현금·파이 31%
            </div>
            <div className="progress-segment" style={{ width: '26%', backgroundColor: '#FF9800' }}>
              미국주식 26%
            </div>
            <div className="progress-segment" style={{ width: '5%', backgroundColor: '#9C27B0' }}>
              기타 5%
            </div>
          </div>
          <button className="compare-button">내 자산과 비교해 보기</button>
        </div>

        {/* 두 번째 카드 */}
        <div className="card">
          <h3>20대 초반 남성은 이번 달 이렇게 썼어요</h3>
          <p>1 등급: 금액 1만원</p>
          <p>2 예적금책: ...</p>
          <p>3 퍼센 4스핀: ...</p>
          <button className="compare-button">나는 어디에 많이 썼을까</button>
        </div>
      </div>
      {/* 하단바 */}

    </div>

  );
};

export default Home;