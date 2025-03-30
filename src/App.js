import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Home from './pages/Home';
import TransactionTab from './pages/TransactionTab.js';
import TransactionForm from './components/TransactionForm';
import AccountForm from './components/AccountForm';
import Profile from './pages/Profile'; // 마이페이지
import BottomNav from './components/BottomNav';
import AssetTab from './pages/AssetTab.js';
import './App.css';
import Chatbot from './pages/Chatbot.js';


function App() {
  return (

    <Router>
      <div className="App">
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />} />
          {/* 회원가입 페이지 */}
          <Route path="/register" element={<Register />} />
          {/* Home 탭 */}
          <Route path="/" element={<Home />} />
          {/* 자산 탭 */}
          <Route path="/transaction" element={<TransactionTab />} />
          {/* 자산 탭에서 내역 추가하는 Form */}
          <Route
            path="/transactionform"
            element={
              <TransactionForm
                onAddTransaction={(transaction) => {
                  console.log("추가된 거래:", transaction);
                }}
              />
            }
          />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/asset" element={<AssetTab />} />
          {/* 더보기 탭 */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/accountform" element={<AccountForm />} />

        </Routes>
        <BottomNav />

      </div>
    </Router>
  );
}

export default App;