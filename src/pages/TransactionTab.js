// /src/pages/TransactionTab.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionList from '../components/TransactionList';
import Header from '../components/Header';
import api from '../services/api';
import './css/TransactionTab.css'; // (선택) CSS 분리

const TransactionTab = () => {
  
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 로그인된 userId 확인
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // 만약 로그인되지 않았다면, 로그인 페이지로 이동하거나 안내 표시
    if (!userId) {
      setLoading(false);
      return;
    }

    // userId가 있다면 해당 유저의 거래 내역 조회
    const fetchTransactions = async () => {
      try {
        const data = await api.getTransactions(userId);
        setTransactions(data);
      } catch (error) {
        console.error('거래 내역 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [userId]);

  // 우측 하단 + 버튼 클릭 시
  const handleAddClick = () => {
    // TransactionForm 페이지로 이동
    navigate('/transactionform');
  };

  // 로그인 안 된 경우 표시
  if (!userId) {
    return (
      <div className="asset-tab-container">
        <h2>자산 탭</h2>
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  // 로딩 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    
    <div className="asset-tab-container">
      <Header />
      {/* 거래 리스트 표시 */}
      <TransactionList transactions={transactions} />

      {/* 우측 하단 + 버튼 (플로팅 버튼) */}
      <button className="floating-btn" onClick={handleAddClick}>
        +
      </button>
    </div>
  );
};

export default TransactionTab;