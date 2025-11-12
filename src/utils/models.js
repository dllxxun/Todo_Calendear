// src/utils/models.js

export const initialTodos = [
  { id: 1, title: "Recoil 환경 설정 완료", isCompleted: true, dueDate: '2025-11-15' },
  { id: 2, title: "TodoList 컴포넌트 구현", isCompleted: false, dueDate: '2025-11-17' },
  { id: 3, title: "Calendar View UI 스케치", isCompleted: false, dueDate: '2025-11-20' },
];

let nextId = 4;

export const generateTodoId = () => {
    return nextId++; // 새 항목 추가 시 사용할 ID 생성 함수
};