// src/App.jsx
import "./App.css";
import React, { useState } from "react";
import TodoList from "./components/Todolist";
import CalendarView from "./components/CalendarView";

// 새로 만든 컴포넌트 import
import LoginScreen from "./components/LoginScreen";
import MainLayout from "./components/MainLayout";

function App() {
  // 선택 날짜 상태 (기본값: 오늘)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDark, setIsDark] = useState(false);

  // 로그인 상태 (임시 유저)
  const [user, setUser] = useState(null);

  // 로그인 후에 보여줄 “기존 레이아웃”을 MainLayout 안에서 재사용
  if (!user) {
    return (
      <div className={`App${isDark ? " dark" : ""}`}>
        <LoginScreen onLogin={(fakeUser) => setUser(fakeUser)} />
      </div>
    );
  }

  return (
    <div className={`App${isDark ? " dark" : ""}`}>
      {/* 다크모드 버튼 그대로 유지 */}
      <button
        onClick={() => setIsDark((prev) => !prev)}
        style={{
          position: "absolute",
          right: "40px",
          top: "40px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.7rem",
        }}
        aria-label="모드 전환"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      {/* 여기부터가 “로그인 후 메인 화면” */}
      <header>
        <h1>🗓️ Todo & Calendar Project</h1>
        <button
          onClick={() => setUser(null)}
          style={{
            marginLeft: "auto",
            marginRight: "20px",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </header>

      <main
        style={{
          padding: "20px",
          display: "flex",
          gap: "40px",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <div style={{ flex: 1 }}>
          <CalendarView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        <div style={{ flex: 1 }}>
          <TodoList selectedDate={selectedDate} />
        </div>
      </main>
    </div>
  );
}

export default App;
