import React, { useState, useEffect } from 'react';
import './css/TransactionForm.css';
import api from '../services/api';
import AccountForm from './AccountForm'; // AccountForm import 추가

// 분류(카테고리) 목록
const CATEGORIES = [
  '식비',
  '교통/차량',
  '문화생활',
  '마트/편의점',
  '패션/미용',
  '생활용품',
  '주거',
  '건강',
  '교육',
  '통신',
  '경조사/회비',
  '부모님',
  '기타',
  '직접 입력'
];

const TransactionForm = ({ onAddTransaction }) => {
  const userId = localStorage.getItem('userId');

  // 거래 유형: 수입, 지출, 이체
  const [transactionType, setTransactionType] = useState('expense');
  // 반복 여부 토글
  const [isRepeat, setIsRepeat] = useState(false);

  // 거래 입력 필드: category와 customCategory 추가
  const [transaction, setTransaction] = useState({
    transactionDate: '',
    amount: '', // 금액: 문자열 형태(쉼표 포함)
    category: '',       // 선택한 분류 (목록에서 선택)
    customCategory: '', // "직접 입력" 시 사용자가 입력한 값
    asset: '',
    description: '',
  });

  const [repeatDay, setRepeatDay] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [showAccountForm, setShowAccountForm] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await api.getAccounts(userId);
        setAccounts(data);
      } catch (err) {
        console.error("자산 목록 불러오기 에러:", err);
      }
    };
    if (userId) fetchAccounts();
  }, [userId]);

  // 일반 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 금액 입력 전용 핸들러: 쉼표 제거 후 포맷 적용
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // 쉼표 제거
    const numericValue = value.replace(/,/g, '');
    // 숫자인지 검사 (빈 문자열 허용)
    if (numericValue === '' || !isNaN(numericValue)) {
      const formattedValue = numericValue === '' ? '' : Number(numericValue).toLocaleString();
      setTransaction((prev) => ({
        ...prev,
        amount: formattedValue
      }));
    }
  };

  // 카테고리 선택 핸들러
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setTransaction((prev) => ({
      ...prev,
      category: selected,
      // '직접 입력'이 아닌 경우 customCategory는 초기화
      customCategory: selected === '직접 입력' ? prev.customCategory : ''
    }));
  };

  const handleTabClick = (type) => {
    setTransactionType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 최종 분류 결정: '직접 입력'이면 customCategory를 사용, 아니면 선택된 분류 사용
      let finalCategory = transaction.category;
      if (transaction.category === '직접 입력') {
        finalCategory = transaction.customCategory || '기타';
      }
      
      // 금액은 쉼표 제거 후 Number로 변환
      const numericAmount = Number(transaction.amount.replace(/,/g, ''));

      if (isRepeat) {
        const payload = {
          amount: numericAmount,
          category: finalCategory,
          content: transaction.description,
          dayOfMonth: parseInt(repeatDay, 10),
          transactionType,
        };
        const res = await api.addFixedExpense(userId, payload);
        onAddTransaction(res);
      } else {
        let payload = {
          ...transaction,
          transactionType,
          category: finalCategory,
          amount: numericAmount, // 숫자로 변환하여 전송
        };
        // 자산 선택 처리
        if (transaction.asset) {
          const selectedAccount = accounts.find(acc => acc.id.toString() === transaction.asset);
          if (selectedAccount) {
            payload.accountName = selectedAccount.institutionName;
            payload.accountNumber = selectedAccount.accountNumber;
          }
        }
        const res = await api.addTransaction(userId, payload);
        onAddTransaction(res);
      }
      // 폼 초기화
      setTransaction({
        transactionDate: '',
        amount: '',
        category: '',
        customCategory: '',
        asset: '',
        description: '',
      });
      setTransactionType('expense');
      setIsRepeat(false);
      setRepeatDay('');
    } catch (error) {
      console.error('거래 추가 에러:', error);
    }
  };

  const handleAddAccount = (newAccount) => {
    setAccounts(prev => [...prev, newAccount]);
    setTransaction(prev => ({ ...prev, asset: newAccount.id.toString() }));
    setShowAccountForm(false);
  };

  return (
    <div className="transaction-container">
      <div className="transaction-tabs">
        <button className={`tab-btn ${transactionType === 'income' ? 'active' : ''}`} onClick={() => handleTabClick('income')}>수입</button>
        <button className={`tab-btn ${transactionType === 'expense' ? 'active' : ''}`} onClick={() => handleTabClick('expense')}>지출</button>
        <button className={`tab-btn ${transactionType === 'transfer' ? 'active' : ''}`} onClick={() => handleTabClick('transfer')}>이체</button>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-row">
          <label>날짜</label>
          <input
            type="date"
            name="transactionDate"
            value={transaction.transactionDate}
            onChange={handleChange}
            required={!isRepeat}
            disabled={isRepeat}
          />
        </div>

        <div className="form-row">
          <label>금액</label>
          {/* 금액 입력 필드: type을 "text"로 사용 */}
          <input
            type="text"
            name="amount"
            value={transaction.amount}
            onChange={handleAmountChange}
            placeholder="0"
            required
          />
        </div>

        <div className="form-row">
          <label>분류</label>
          <select
            name="categorySelect"
            value={transaction.category}
            onChange={handleCategoryChange}
          >
            <option value="">-- 선택 --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {transaction.category === '직접 입력' && (
          <div className="form-row">
            <label>직접입력</label>
            <input
              type="text"
              name="customCategory"
              value={transaction.customCategory}
              onChange={handleChange}
              placeholder="예: 예적금, 투자 등"
            />
          </div>
        )}

        <div className="form-row" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label>자산</label>
            <select
              name="asset"
              value={transaction.asset}
              onChange={handleChange}
            >
              <option value="">-- 선택하세요 --</option>
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.institutionName} {account.accountNumber ? `(${account.accountNumber})` : ''}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn"
            onClick={() => setShowAccountForm(prev => !prev)}
          >
            자산 추가
          </button>
        </div>

        <div className="form-row toggle-row">
          <span>반복/할부</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isRepeat}
              />
              onChange={() => setIsRepeat(!isRepeat)}
            <span className="slider round"></span>
          </label>
        </div>

        {isRepeat && (
          <div className="form-row">
            <label>반복일 (매월 몇일)</label>
            <input
              type="number"
              name="repeatDay"
              value={repeatDay}
              onChange={(e) => setRepeatDay(e.target.value)}
              placeholder="1-31"
              min="1"
              max="31"
              required
            />
          </div>
        )}

        <div className="form-row">
          <label>내용</label>
          <input
            type="text"
            name="description"
            value={transaction.description}
            onChange={handleChange}
            placeholder="메모를 입력하세요"
          />
        </div>

        <div className="additional-row">
          <span>추가입력</span>
        </div>

        <div className="button-row">
          <button type="submit" className="save-btn">저장</button>
          <button type="button" className="continue-btn">계속</button>
        </div>
      </form>

      {showAccountForm && (
        <>
          <div className="account-form-modal-backdrop" onClick={() => setShowAccountForm(false)}></div>
          <div className="account-form-modal">
            <h3>자산 추가</h3>
            <AccountForm onAddAccount={handleAddAccount} userId={userId} />
            <button onClick={() => setShowAccountForm(false)}>닫기</button>
          </div>
        </>
      )}
    </div>
  );
};

TransactionForm.defaultProps = {
  onAddTransaction: () => {}
};

export default TransactionForm;