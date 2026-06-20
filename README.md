# 📝 Todo & Calendar Web App

<img width="1232" height="848" alt="image" src="https://github.com/user-attachments/assets/910d6a02-a790-4d63-8016-18ed695b6bd7" />
React 기반의 **Todo + Calendar 통합 웹 애플리케이션**입니다.  
날짜별 할 일 관리, 월간 일정 확인, 공부 타이머 기능을 한 화면에서 사용할 수 있으며  
Firebase Authentication과 Firestore를 활용해 실제 서비스 구조로 구현했습니다.



## ✨ Feature

- 📅 **Calendar & Todo**
  - 날짜별 Todo 추가 / 수정 / 삭제 / 완료 처리
  - 선택한 날짜의 Todo 목록 표시
- ⏱ **Focus Timer**
  - 25분 기준 집중 타이머 (시작 / 일시정지 / 리셋)
  - 일일 공부 시간 Firestore 누적 저장
- 📊 **Monthly Study Statistics**
  - 이번 달 총 공부 시간 표시
  - 날짜별 공부 시간 캘린더 뷰 제공
- 🔐 **Authentication**
  - Firebase Authentication 기반 로그인 / 로그아웃
  - 로그인 후 메인 기능 접근 가능



## 🛠 Tech Stack

- **Frontend**: React, Vite, Recoil
- **Backend Service**: Firebase Authentication, Cloud Firestore
- **Styling**: CSS



## 🚀 Getting Started

### 1. Installation
```bash
git clone <REPO_URL>
cd <project-folder>
npm install
```

### 2. Environment Variables

Create a .env or .env.local file in the project root.

```bash
VITE_FIREBASE_API_KEY=XXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxx
```

### 3. Run Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 4. Build
```bash
npm run build
```
