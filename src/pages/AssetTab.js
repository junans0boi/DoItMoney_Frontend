// /src/pages/AssetTab.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import api from '../services/api';
import './css/AssetTab.css';

const AssetTab = () => {
  const userId = localStorage.getItem('userId');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await api.getAccounts(userId);
        setAccounts(data);
      } catch (error) {
        console.error("자산 목록 불러오기 에러:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchAccounts();
    } else {
      setLoading(false);
    }
  }, [userId]);

  // 계좌 유형별 분류 (대문자로 저장된 accountType을 기준으로)
  const cashAccounts = accounts.filter(acc => acc.accountType === 'CASH');
  const bankAccounts = accounts.filter(acc => acc.accountType === 'BANK');
  const cardAccounts = accounts.filter(acc => acc.accountType === 'CARD');

  // 계산 예시 (현금, 은행은 자산, 카드는 부채로 간주)
  const totalCash = cashAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalBank = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalCard = cardAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalAsset = totalCash + totalBank;
  const totalLiability = totalCard;
  const net = totalAsset - totalLiability;

  if (!userId) {
    return (
      <div className="asset-tab-container">
        <Header />
        <div className="not-logged-in">
          <p>로그인이 필요합니다.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="asset-tab-container">
        <Header />
        <p>로딩 중...</p>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="asset-tab-container">
      <Header />

      {/* 상단 요약 영역 */}
      <div className="asset-summary">
        <div className="summary-item">
          <span>총 자산</span>
          <span>{totalAsset.toLocaleString()}원</span>
        </div>
        <div className="summary-item">
          <span>총 부채</span>
          <span>{totalLiability.toLocaleString()}원</span>
        </div>
        <div className="summary-item">
          <span>합계</span>
          <span className={net < 0 ? 'negative' : 'positive'}>{net.toLocaleString()}원</span>
        </div>
      </div>

      {/* 현금 섹션 */}
      <div className="asset-section">
        <h3>현금</h3>
        {cashAccounts.length > 0 ? (
          <ul>
            {cashAccounts.map(acc => (
              <li key={acc.id}>
                <span>{acc.institutionName}</span>
                <span>{acc.balance.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>현금 계좌가 없습니다.</p>
        )}
      </div>

      {/* 은행 섹션 */}
      <div className="asset-section">
        <h3>은행</h3>
        <p>모든 은행 잔액: {totalBank.toLocaleString()}원</p>
        {bankAccounts.length > 0 ? (
          <ul>
            {bankAccounts.map(acc => (
              <li key={acc.id}>
                <span>{acc.institutionName}</span>
                <span>{acc.balance.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>은행 계좌가 없습니다.</p>
        )}
      </div>

      {/* 카드 섹션 */}
      <div className="asset-section">
        <h3>카드</h3>
        {cardAccounts.length > 0 ? (
          <ul>
            {cardAccounts.map(acc => (
              <li key={acc.id}>
                <span>{acc.institutionName}</span>
                <span>{acc.balance.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>카드 계좌가 없습니다.</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default AssetTab;