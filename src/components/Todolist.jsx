// src/components/TodoList.jsx
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../store/todoStore';

function TodoList({selectedDate }) {
  // useRecoilState를 사용하여 상태를 읽고 업데이트 함수를 가져옵니다.
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [input, setInput] = useState('');

  // 할 일 추가
  const handleAddTodo = () => {
    if (input.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      title: input,
      isCompleted: false,
      dueDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    };
    setTodoList([...todoList, 
      {
        id: Date.now(),
        title: input,
        isCompleted: false,
        dueDate: selectedDate.toISOString().slice(0, 10), // 날짜 문자열로
      }
    ]);
    setInput('');
  };

  // 선택된 날짜만 필터링
  const filteredTodos = todoList.filter(
    todo => todo.dueDate === selectedDate.toISOString().slice(0, 10)
  );

  // 할 일 삭제
  const handleDeleteTodo = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  // Todo 항목의 완료 상태를 토글하는 함수
  const toggleComplete = (id) => {
    setTodoList(oldTodoList => 
      oldTodoList.map(todo => 
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div>
      <h2>📌 오늘의 할 일</h2>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          style={{ flex: 1, marginRight: '10px' }}
          onKeyPress={e => e.key === 'Enter' && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>추가</button>
      </div>
      {todoList.map(todo => (
        <div key={todo.id}
          style={{
            padding: '10px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center'
          }}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => toggleComplete(todo.id)}
            style={{ marginRight: '10px' }}
          />
          <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <small style={{ marginLeft: 'auto', color: '#888' }}>
            ({todo.dueDate})
          </small>
          {/* --- 삭제 버튼 추가 --- */}
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            style={{ marginLeft: '10px', color: 'red', border: 'none', cursor: 'pointer' }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;