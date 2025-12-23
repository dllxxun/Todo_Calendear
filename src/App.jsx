// src/App.jsx
import "./App.css";
import React, { useState } from "react";
import TodoList from "./components/Todolist";
import CalendarView from "./components/CalendarView";
import LoginScreen from "./components/LoginScreen";
import MyPage from "./components/MyPage";
import CalendarPage from "./components/CalendarPage";
import FocusTimerPage from "./components/FocusTimerPage";


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDark, setIsDark] = useState(false);

  // 로그인된 사용자 (Firebase User)
  const [user, setUser] = useState(null);

  // 햄버거 메뉴 열림 여부
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 현재 페이지: home | calendar | my
  const [currentPage, setCurrentPage] = useState("home");

  // 로그인 안 했을 때는 로그인 화면만 보여주기
  if (!user) {
    return (
      <div className={`App${isDark ? " dark" : ""}`}>
        <LoginScreen onLogin={(firebaseUser) => setUser(firebaseUser)} />
      </div>
    );
  }

  // 로그인 후 메인 화면
  return (
    <div className={`App${isDark ? " dark" : ""}`}>
      {/* 헤더 + 햄버거 메뉴 + 로그아웃 */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 20px",
          borderBottom: "1px solid #e5e7eb",
          background: "#fff",
        }}
      >
        {/* 햄버거 버튼: 사이드바 열기 */}
        <button
          onClick={() => setIsMenuOpen(true)}
          style={{
            fontSize: "1.4rem",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="메뉴 열기"
        >
          ☰
        </button>

        {/* 로고/타이틀: 클릭 시 home으로 이동 */}
        <button
          onClick={() => setCurrentPage("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          <span>🗓️</span>
          <span>Todo &amp; Calendar Project</span>
        </button>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.9rem" }}>
            {user.displayName || "사용자"}
          </span>
        </div>
      </header>

      {/* 왼쪽에서 나오는 사이드 메뉴 */}
      {isMenuOpen && (
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "220px",
            height: "100vh",
            padding: "80px 16px 16px",
            background: "#111827",
            color: "#f9fafb",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            zIndex: 100,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
            }}
          >
            <span style={{ fontWeight: 600 }}>Todo &amp; Calendar</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#9ca3af",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
              aria-label="사이드바 닫기"
            >
              ✕
            </button>
          </div>

          {/* 캘린더 전용 페이지 */}
          <button
            style={{
              textAlign: "left",
              border: "none",
              background: "transparent",
              color: "#e5e7eb",
              fontSize: "0.95rem",
              padding: "8px 4px",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrentPage("calendar");
              setIsMenuOpen(false);
            }}
          >
            캘린더
          </button>

          {/* 피드 / 알림은 일단 동작 없음 */}
          <button
            style={{
              textAlign: "left",
              border: "none",
              background: "transparent",
              color: "#e5e7eb",
              fontSize: "0.95rem",
              padding: "8px 4px",
              cursor: "pointer",
            }}
          >
            피드
          </button>

          <button
            style={{
              textAlign: "left",
              border: "none",
              background: "transparent",
              color: "#e5e7eb",
              fontSize: "0.95rem",
              padding: "8px 4px",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrentPage("timer");
              setIsMenuOpen(false);
            }}
          >
            타이머
          </button>

          {/* My 페이지 */}
          <button
            style={{
              textAlign: "left",
              border: "none",
              background: "transparent",
              color: "#e5e7eb",
              fontSize: "0.95rem",
              padding: "8px 4px",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrentPage("timer");
              setIsMenuOpen(false);
            }}
          >
            My
          </button>
        </nav>
      )}

      {/* 메인 영역 */}
      <main
        style={{
          padding: "20px",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        {currentPage === "home" && (
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ flex: 1 }}>
              <CalendarView
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div style={{ flex: 1 }}>
              <TodoList selectedDate={selectedDate} />
            </div>
          </div>
        )}

        {currentPage === "calendar" && (
          <CalendarPage
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}

        {currentPage === "my" && (
          <MyPage
            isDark={isDark}
            setIsDark={setIsDark}
            onLogout={() => {
              setUser(null);
              setCurrentPage("home");
            }}
          />
        )}

        {currentPage === "timer" && <FocusTimerPage />}

      </main>
    </div>
  );
}

export default App;
