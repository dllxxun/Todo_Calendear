# Todo & Calendar Project

React 기반의 **Todo + Calendar 웹 애플리케이션**으로, 하루 할 일 관리와 월별 일정 확인, 공부 타이머 기능을 한 화면에서 사용할 수 있는 프로젝트입니다.  
Firebase Authentication과 Firestore를 사용해 인증 및 데이터를 관리하도록 설계되어 있습니다.[web:310]

---

## 1. 프로젝트 소개

이 프로젝트는 다음과 같은 목표로 제작되었습니다.

- 날짜별 할 일을 등록 · 완료 처리할 수 있는 **캘린더+Todo 통합 UI** 제공  
- 하루 공부 시간을 측정하고, **월별 공부 시간 통계**를 확인할 수 있는 집중 타이머 제공  
- Firebase Authentication과 Firestore를 활용한 **실제 서비스 수준의 연동 구조** 구현[web:310]

주요 기술 스택:

- Frontend: React, Vite, Recoil (전역 상태 관리)  
- Backend 서비스: Firebase Authentication, Cloud Firestore[web:310]
- Styling: 기본 CSS + 인라인 스타일

---

## 2. 실행 방법

### 2-1. 설치

1. 저장소 클론
   ```bash
   git clone <REPO_URL>
   cd <프로젝트_폴더>   # 예: todo_web
   ```
2. 의존성 설치
    ```bash
    npm install
    ```
3. 환경 변수(.env) 설정
    Firebase 콘솔에서 웹 앱 설정 정보를 복사해 루트에 .env 또는 .env.local 파일을 생성합니다.
    ```bash
    text
    VITE_FIREBASE_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
    VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
    VITE_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxxxxxx
    ```

### 2-2. 개발 서버 실행
```bash
npm run dev
```
터미널에 표시되는 주소(기본: http://localhost:5173)로 접속하면 애플리케이션을 실행할 수 있습니다.[web:297]

### 2-3. 프로덕션 빌드
```bash
npm run build
```
생성된 dist 폴더를 GitHub Pages 등 정적 호스팅 환경에 배포해 사용할 수 있습니다.[web:298]

## ✨ 기능

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

---

## 🛠 기술 스택

- **Frontend**: React, Vite, Recoil
- **Backend Service**: Firebase Authentication, Cloud Firestore
- **Styling**: CSS

---