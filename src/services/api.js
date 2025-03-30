// /src/services/api.js
import axios from 'axios';

// 예: 백엔드 서버 주소 (실제 포트나 도메인에 맞게 수정)
const API_BASE_URL = 'http://doitmoney.kro.kr';

const api = {
  getMyTransactions: async () => {
    const response = await axios.get(`${API_BASE_URL}/transactions`);
    return response.data;
  },
  // userId의 거래 내역 조회
  getTransactions: async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/transactions/${userId}`);
    return response.data;
  },

  // userId에 새 거래 추가
  addTransaction: async (userId, transaction) => {
    const response = await axios.post(`${API_BASE_URL}/transactions/${userId}`, transaction);
    return response.data;
  },
  loginUser: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    return response.data;
  },
  registerUser: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return response.data;
  },
  // 새로 추가: 고정지출 등록 API
  addFixedExpense: async (userId, fixedExpense) => {
    const response = await axios.post(`${API_BASE_URL}/fixed-expenses/${userId}`, fixedExpense);
    return response.data;
  },
    // 새로 추가: 계좌 등록 및 조회
    addAccount: async (userId, account) => {
      const response = await axios.post(`${API_BASE_URL}/accounts/${userId}`, account);
      return response.data;
  },
  getAccounts: async (userId) => {
      const response = await axios.get(`${API_BASE_URL}/accounts/${userId}`);
      return response.data;
  },
};

export default api;