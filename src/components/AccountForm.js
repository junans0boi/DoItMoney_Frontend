import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AccountForm = ({ onAddAccount, userId }) => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState({
        accountType: 'BANK', // 기본 선택: BANK
        institutionName: '',
        accountNumber: '',
        balance: '',
    });

    // 은행 목록
    const bankList = [
        "KB국민은행",
        "우리은행",
        "신한은행",
        "하나은행",
        "NH농협은행",
        "IBK기업은행",
        "케이뱅크",
        "카카오뱅크",
        "토스뱅크",
        "KDB산업은행",
        "SH수협은행",
        "한국씨티은행",
        "SC제일은행",
        "BNK부산은행",
        "BNK경남은행",
        "DGB대구은행",
        "제주은행",
        "전북은행",
        "광주은행"
    ];

    // 카드 목록
    const cardList = [
        "KB국민카드",
        "삼성카드",
        "신한카드",
        "우리카드",
        "IBK기업은행",
        "하나카드",
        "롯데카드",
        "현대카드",
        "우체국",
        "NH농협카드",
        "카카오뱅크",
        "토스뱅크"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData({ ...accountData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // balance를 숫자로 변환
            const account = { ...accountData, balance: Number(accountData.balance) };
            const res = await api.addAccount(userId, account);
            onAddAccount(res);
            // 폼 초기화
            setAccountData({
                accountType: 'BANK',
                institutionName: '',
                accountNumber: '',
                balance: '',
            });
        } catch (err) {
            console.error("계좌 등록 에러:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>계좌 유형</label>
                <select
                    name="accountType"
                    value={accountData.accountType}
                    onChange={(e) => {
                        handleChange(e);
                        // 계좌 유형 변경 시 기관명 초기화
                        setAccountData((prev) => ({ ...prev, institutionName: '' }));
                    }}
                >
                    <option value="BANK">은행</option>
                    <option value="CARD">카드</option>
                    <option value="CASH">현금</option>
                    <option value="ETC">기타</option>
                </select>
            </div>

            <div className="form-group">
                <label>기관명</label>
                {accountData.accountType === 'BANK' ? (
                    <select
                        name="institutionName"
                        value={accountData.institutionName}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- 선택하세요 --</option>
                        {bankList.map((bank, index) => (
                            <option key={index} value={bank}>
                                {bank}
                            </option>
                        ))}
                    </select>
                ) : accountData.accountType === 'CARD' ? (
                    <select
                        name="institutionName"
                        value={accountData.institutionName}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- 선택하세요 --</option>
                        {cardList.map((card, index) => (
                            <option key={index} value={card}>
                                {card}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        name="institutionName"
                        value={accountData.institutionName}
                        onChange={handleChange}
                        required
                    />
                )}
            </div>

            <div className="form-group">
                <label>계좌번호</label>
                <input
                    type="text"
                    name="accountNumber"
                    value={accountData.accountNumber}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>잔액</label>
                <input
                    type="number"
                    name="balance"
                    value={accountData.balance}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">계좌 등록</button>
        </form>
    );
};

export default AccountForm;