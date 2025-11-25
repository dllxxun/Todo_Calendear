// src/App.jsx
import './App.css'; 
import React, { useState } from 'react';
import TodoList from './components/Todolist'; 
import CalendarView from './components/CalendarView';

function App() {
  // 선택 날짜 상태를 여기서 선언 (기본값은 오늘)
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="App">
      <header>
        <h1>🗓️ Todo & Calendar Project</h1>
      </header>
      <main style={{ 
        padding: '20px',
        display: 'flex',       // TodoList와 CalendarView를 나란히 배치
        gap: '40px',           // 두 컴포넌트 사이에 40px 간격 추가
        maxWidth: '1000px', 
        width: '100%' 
      }}>
        {/* 달력 컴포넌트를 왼쪽에 배치 (선택 사항) */}
        <div style={{ flex: 1 }}>
          <CalendarView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        {/* To-do 리스트 컴포넌트를 오른쪽에 배치 */}
        <div style={{ flex: 1 }}>
          <TodoList selectedDate={selectedDate} />
        </div>
      </main>
    </div>
  );
}

export default App;