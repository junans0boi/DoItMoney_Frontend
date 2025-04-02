# 나만의 AI가계부 - DoitMoney_Frontend

나만의 AI가계부는 개인 재무 관리와 소비 패턴 분석을 지원하는 웹 기반 애플리케이션입니다. 이 애플리케이션은 사용자가 직접 수입 및 지출 내역을 기록하고, 예산을 설정하며, 고정 지출 및 저축 목표를 관리할 수 있도록 도와줍니다. 또한, AI 기반 재무 어드바이저와 데이터 시각화 기능을 통해 사용자 맞춤형 절약 팁과 소비 패턴 분석을 제공합니다.

---

## 1. 사용 웹 프레임워크

- **React**  
  - 컴포넌트 기반 구조로 재사용 가능한 UI 개발
  - React Router를 통한 페이지 라우팅 관리

---

## 2. 제작 팀원

| 학번       | 이름   |
|------------|--------|
| 202045044  | 고재형 |
| 202045066  | 이준환 |

---

## 3. 협업 환경

- **Code-Server**  
  - 원격 개발 환경 구축을 통해 팀원들이 동일한 환경에서 효율적으로 작업할 수 있도록 지원
- **GitHub**  
  - 버전 관리 및 협업 플랫폼으로 사용
  - Pull Request 및 코드 리뷰를 통해 품질 관리

---

## 4. 배포 방식

- **Ubuntu 22.04**  
  - 안정적인 서버 운영체제로 선택
- **Nginx**  
  - 리버스 프록시를 통한 정적 파일 서빙 및 애플리케이션 배포 관리

---

## 5. 주요 기능

| 기능                                 | 설명 |
|--------------------------------------|------|
| **수입 및 지출 관리**                | - 사용자가 직접 거래 내역을 입력, 수정, 삭제할 수 있도록 지원 (Transaction CRUD API) <br> - 카테고리별 정리 (식비, 교통비, 쇼핑, 고정 지출 등) |
| **예산 설정 및 관리**                | - 월별/주별 예산을 설정하고 카테고리별 예산을 관리 (Budget API 연동) <br> - 예산 초과 시 알림 기능 제공 |
| **고정 지출 관리**                   | - 정기적인 지출(월세, 구독 서비스 등)을 자동으로 기록하는 스케줄링 기능 <br> - 고정 지출 일정 관리 및 자동 알림 기능 |
| **저축 및 목표 설정**                | - 저축 목표 설정 및 목표 달성률을 시각화하여 동기 부여 <br> - Goal API 연동을 통한 목표 관리 |
| **AI 기반 재무 어드바이저**           | - 사용자의 거래 내역과 소비 패턴을 분석하여 맞춤형 재무 조언 제공 <br> - 챗봇 UI를 통한 대화형 인터페이스 제공 (LLM API 연동) |
| **데이터 시각화 및 분석**             | - 월별, 연도별 소비 패턴을 바 차트 등으로 시각화 <br> - AI 기반 소비 패턴 예측 및 절약 팁 제공 (통계/분석 API) |
| **뱅킹 앱 입출금 내용 OCR**           | - 캡쳐한 이미지에서 텍스트를 추출하여 자동 입력 기능 제공 <br> - 다양한 뱅킹 앱 (토스, 카카오뱅크, 등) 지원 |
| **금융 리포트 제공**                 | - 월별 재무 보고서를 PDF로 생성 및 다운로드 지원 <br> - 수입/지출 대비 분석 및 절약 팁 추천 |

---

## 6. 프로젝트 구조

```plaintext
DoitMoney_Frontend/
├── public/                   # 정적 파일 (HTML, 이미지, 아이콘 등)
├── src/
│   ├── components/           # 재사용 가능한 UI 컴포넌트 (Header, BottomNav, TransactionForm, AccountForm, 등)
│   ├── pages/                # 각 페이지 컴포넌트 (Home, Login, Register, TransactionTab, Profile, Chatbot, AssetTab 등)
│   ├── services/             # 백엔드 API와의 통신 모듈 (api.js)
│   ├── App.js                # 애플리케이션 전역 라우터 및 레이아웃 설정
│   └── index.js              # 애플리케이션 진입점
└── package.json              # 프로젝트 의존성 및 스크립트 관리

```

⸻

## 7. 문의 및 연락
프로젝트 관련 문의나 피드백은 아래 이메일로 연락 부탁드립니다.
• 고재형 (202045044)
• 이준환 (202045066)
• Contact: junans0boi@gmail.com

⸻
[**http://doitmoney.kro.kr/api/swagger-ui/index.html**](http://doitmoney.kro.kr/api/swagger-ui/index.html)

# 배포 주소: [**http://doitmoney.kro.kr**](http://doitmoney.kro.kr)
