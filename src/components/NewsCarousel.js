import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/NewsCarousel.css';

const NewsCarousel = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 뉴스 목록 불러오기 (예시: /news/today 엔드포인트 사용)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://doitmoney.kro.kr/news/today');
        setNewsItems(response.data);
      } catch (error) {
        console.error('뉴스 불러오기 에러:', error);
      }
    };
    fetchNews();
  }, []);

  // 2초마다 슬라이드 전환
  useEffect(() => {
    if (newsItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % newsItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [newsItems]);

  // 슬라이드 클릭 시 링크 열기 (새 탭)
  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  if (newsItems.length === 0) return <div className="news-carousel">뉴스 로딩 중...</div>;

  return (
    <div className="news-carousel">
      {newsItems.map((item, index) => (
        <div
          key={item.id}
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          onClick={() => handleClick(item.link)}
        >
          <img
            src={item.thumbnail || '/default-news.jpg'}
            alt={item.title}
            className="slide-image"
          />
          <div className="slide-content">
            <h3>{item.title}</h3>
            <p>{item.snippet}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCarousel;