// src/components/CalendarView.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarView.css';
import { useRecoilValue } from 'recoil';
import { todoListState } from '../store/todoStore'; // To-do 상태 import



// Calendar 컴포넌트
function CalendarView() {
  // 캘린더에서 선택된 날짜 상태 (기본값은 오늘)
  const [value, onChange] = useState(new Date()); 
  
  // Recoil에서 To-do 리스트 가져오기
  const todoList = useRecoilValue(todoListState); 

  // 마감일이 있는 날짜 목록을 추출하는 함수
  const getDatesWithTodos = () => {
    // 1. To-do 항목 중 'dueDate'가 있는 항목만 필터링
    // 2. 날짜 문자열만 추출하여 Set에 저장 (중복 제거)
    return new Set(
      todoList
        .filter(todo => todo.dueDate)
        .map(todo => new Date(todo.dueDate).toDateString()) // 날짜 문자열 통일
    );
  };

  const datesWithTodos = getDatesWithTodos();

  // 캘린더 타일(날짜 셀)을 꾸며주는 함수
  const tileClassName = ({ date, view }) => {
    // 'month' 뷰에서만 작동
    if (view === 'month') {
      // 현재 타일의 날짜가 To-do가 있는 날짜 목록에 포함되는지 확인
      if (datesWithTodos.has(date.toDateString())) {
        return 'highlight-todo'; // 사용자 정의 CSS 클래스 반환
      }
    }
  };

  return (
    <div className="calendar-container" style={{ padding: '20px' }}>
      <h2>🗓️ 마감일 달력</h2>
      <Calendar
        onChange={onChange} // 날짜 변경 핸들러
        value={value} // 현재 선택된 날짜
        tileClassName={tileClassName} // 날짜 셀에 클래스 적용
      />
      <p style={{ marginTop: '10px' }}>
        선택된 날짜: **{value.toLocaleDateString()}**
      </p>
    </div>
  );
}

export default CalendarView;