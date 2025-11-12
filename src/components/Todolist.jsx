// src/components/TodoList.jsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../store/todoStore';

function TodoList() {
  // useRecoilState를 사용하여 상태를 읽고 업데이트 함수를 가져옵니다.
  const [todoList, setTodoList] = useRecoilState(todoListState);

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
      {todoList.map(todo => (
        <div key={todo.id} style={{
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
        </div>
      ))}
    </div>
  );
}

export default TodoList;