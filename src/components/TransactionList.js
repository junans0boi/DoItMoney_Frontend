import React, { useState } from 'react';
import './css/TransactionList.css';

// 헬퍼 함수: 요일 반환 (예: "월")
const getWeekdayName = (dateString) => {
  const dateObj = new Date(dateString);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  return weekdays[dateObj.getDay()];
};

// 헬퍼 함수: 금액을 3자리마다 쉼표로 포맷
const formatAmount = (num) => {
  if (typeof num !== 'number') return num;
  return num.toLocaleString('ko-KR');
};

// 거래들을 날짜별로 그룹화하는 함수
const groupByDate = (transactions) => {
  const map = {};
  transactions.forEach((tx) => {
    const dateKey = tx.transactionDate; // "YYYY-MM-DD"
    if (!map[dateKey]) {
      map[dateKey] = [];
    }
    map[dateKey].push(tx);
  });
  return map;
};

const TransactionList = ({ transactions }) => {
  // 기본 선택 연/월은 현재 날짜 기준
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1); // 1~12
  const [viewMode, setViewMode] = useState('daily'); // 'daily' | 'calendar' | 'monthly' | 'summary'
  const [showDateModal, setShowDateModal] = useState(false);

  // 상단 헤더에 표시할 연/월 텍스트
  const displayYearMonth = `${selectedYear}년 ${selectedMonth}월`;

  // 선택한 연/월에 해당하는 거래만 필터링
  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.transactionDate);
    return txDate.getFullYear() === selectedYear && (txDate.getMonth() + 1) === selectedMonth;
  });

  // 날짜 내림차순 정렬
  const sortedTransactions = filteredTransactions.sort((a, b) =>
    a.transactionDate < b.transactionDate ? 1 : -1
  );

  // 일일 뷰: 날짜별 그룹화 및 내림차순 정렬
  const grouped = groupByDate(sortedTransactions);
  const sortedDates = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

  // 달력 뷰: 선택한 연/월의 달력 데이터 생성
  const generateCalendar = () => {
    const firstDay = new Date(selectedYear, selectedMonth - 1, 1);
    const lastDay = new Date(selectedYear, selectedMonth, 0);
    const calendar = [];
    let week = [];

    // 1일이 시작하는 요일 이전 빈 칸 채우기
    for (let i = 0; i < firstDay.getDay(); i++) {
      week.push(null);
    }
    for (let day = 1; day <= lastDay.getDate(); day++) {
      week.push(new Date(selectedYear, selectedMonth - 1, day));
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }
    while (week.length < 7) {
      week.push(null);
    }
    calendar.push(week);
    return calendar;
  };
  const calendarData = generateCalendar();

  // 달력 뷰: 해당 날짜의 총 수입/지출 계산
  const getDayTotals = (dateObj) => {
    if (!dateObj) return { income: 0, expense: 0 };
    const dateStr = dateObj.toISOString().split('T')[0];
    const dayTx = sortedTransactions.filter((tx) => tx.transactionDate === dateStr);
    const income = dayTx
      .filter((tx) => tx.transactionType === 'income')
      .reduce((acc, cur) => acc + cur.amount, 0);
    const expense = dayTx
      .filter((tx) => tx.transactionType === 'expense')
      .reduce((acc, cur) => acc + cur.amount, 0);
    return { income, expense };
  };

  // 월별 통계 계산
  const totalIncome = sortedTransactions
    .filter((tx) => tx.transactionType === 'income')
    .reduce((acc, cur) => acc + cur.amount, 0);
  const totalExpense = sortedTransactions
    .filter((tx) => tx.transactionType === 'expense')
    .reduce((acc, cur) => acc + cur.amount, 0);
  const net = totalIncome - totalExpense;

  // 연/월 선택 모달
  const renderDateModal = () => {
    // 예시로 현재 연도 기준 -5 ~ +5 범위
    const years = Array.from({ length: 11 }, (_, i) => selectedYear - 5 + i);
    return (
      <div className="date-modal-backdrop" onClick={() => setShowDateModal(false)}>
        <div className="date-modal" onClick={(e) => e.stopPropagation()}>
          <h3>연/월 선택</h3>
          <div className="date-modal-selects">
            <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
              {years.map((year) => (
                <option key={year} value={year}>{year}년</option>
              ))}
            </select>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>{month}월</option>
              ))}
            </select>
          </div>
          <button onClick={() => setShowDateModal(false)}>확인</button>
        </div>
      </div>
    );
  };

  // 렌더링할 뷰에 따라 내용 결정
  return (
    <div className="transaction-list-container">
      {/* 상단 연/월 헤더 */}
      <div className="tl-header">
        <button className="tl-header-btn" onClick={() => {
          let newMonth = selectedMonth - 1;
          let newYear = selectedYear;
          if (newMonth < 1) {
            newMonth = 12;
            newYear--;
          }
          setSelectedMonth(newMonth);
          setSelectedYear(newYear);
        }}>{'<'}</button>
        <div className="tl-header-title">
          <span className="year-month" onClick={() => setShowDateModal(true)}>
            {displayYearMonth}
          </span>
        </div>
        <button className="tl-header-btn" onClick={() => {
          let newMonth = selectedMonth + 1;
          let newYear = selectedYear;
          if (newMonth > 12) {
            newMonth = 1;
            newYear++;
          }
          setSelectedMonth(newMonth);
          setSelectedYear(newYear);
        }}>{'>'}</button>
      </div>
      {showDateModal && renderDateModal()}

      {/* 탭 메뉴 */}
      <div className="tl-tab-menu">
        <button className={viewMode === 'daily' ? 'active' : ''} onClick={() => setViewMode('daily')}>
          일일
        </button>
        <button className={viewMode === 'calendar' ? 'active' : ''} onClick={() => setViewMode('calendar')}>
          달력
        </button>
        <button className={viewMode === 'monthly' ? 'active' : ''} onClick={() => setViewMode('monthly')}>
          월별
        </button>
        <button className={viewMode === 'summary' ? 'active' : ''} onClick={() => setViewMode('summary')}>
          요약
        </button>
      </div>

      {/* 뷰별 렌더링 */}
      {viewMode === 'daily' && (
        <>
          {sortedDates.map((dateKey) => {
            const list = grouped[dateKey];
            const dayTotalIncome = list
              .filter((tx) => tx.transactionType === 'income')
              .reduce((acc, cur) => acc + cur.amount, 0);
            const dayTotalExpense = list
              .filter((tx) => tx.transactionType === 'expense')
              .reduce((acc, cur) => acc + cur.amount, 0);
            const dayOfWeek = getWeekdayName(dateKey);
            const day = dateKey.slice(-2);
            return (
              <div key={dateKey} className="tl-day-block">
                <div className="tl-day-header">
                  <span className="day-number">
                    {Number(day)} <small>{dayOfWeek}요일</small>
                  </span>
                  <span className="day-totals">
                    수입 {formatAmount(dayTotalIncome)}원 / 지출 {formatAmount(dayTotalExpense)}원
                  </span>
                </div>
                {list.map((tx) => (
                  <div key={`${tx.userId}-${tx.id}`} className="tl-transaction-item">
                    <div className="tx-category">{tx.category || '기타'}</div>
                    <div className="tx-description">{tx.description || '-'}</div>
                    <div className="tx-method">
                      {tx.accountName} {tx.accountNumber ? `(${tx.accountNumber})` : ''}
                    </div>
                    <div className={`tx-amount ${tx.transactionType}`}>
                      {tx.transactionType === 'expense' ? '-' : tx.transactionType === 'income' ? '+' : ''}
                      {formatAmount(tx.amount)}원
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </>
      )}

      {viewMode === 'calendar' && (
        <div className="tl-calendar">
          {calendarData.map((week, index) => (
            <div key={index} className="calendar-week">
              {week.map((day, idx) => {
                const { income, expense } = getDayTotals(day);
                return (
                  <div key={idx} className="calendar-day">
                    {day ? (
                      <>
                        <div className="day-number">{day.getDate()}</div>
                        <div className="day-info">
                          <div className="income">{income > 0 ? `+${formatAmount(income)}원` : ''}</div>
                          <div className="expense">{expense > 0 ? `-${formatAmount(expense)}원` : ''}</div>
                        </div>
                      </>
                    ) : (
                      <div className="empty-day"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {viewMode === 'monthly' && (
        <div className="tl-monthly-summary">
          <h3>{selectedYear}년 {selectedMonth}월 통계</h3>
          <div className="summary-item">
            <span>수입:</span> <span className="income">{formatAmount(totalIncome)}원</span>
          </div>
          <div className="summary-item">
            <span>지출:</span> <span className="expense">{formatAmount(totalExpense)}원</span>
          </div>
          <div className="summary-item">
            <span>순수익:</span> <span className={`net ${net < 0 ? 'minus' : 'plus'}`}>{formatAmount(net)}원</span>
          </div>
        </div>
      )}

      {viewMode === 'summary' && (
        <div className="tl-summary-view">
          <h3>요약</h3>
          <p>준비 중...</p>
        </div>
      )}

    </div>
  );
};

export default TransactionList;