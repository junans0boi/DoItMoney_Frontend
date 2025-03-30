import React, { useState } from 'react';
import axios from 'axios';
import './css/Chatbot.css'; // 적절한 스타일링 추가

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 사용자가 메시지를 전송하면 백엔드 LLM API 호출
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userId = localStorage.getItem('userId') || 0; // 로그인하지 않은 경우 기본값 0
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post('http://doitmoney.kro.kr/ai/advisor', {
        userId,
        message: input
      });
      const botMessage = { sender: 'bot', text: response.data };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("AI 어드바이저 호출 에러:", error);
      const errorMsg = { sender: 'bot', text: "죄송합니다. 조언을 가져오지 못했습니다." };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>AI 재무 어드바이저</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="재무 관련 질문을 입력하세요..."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default Chatbot;