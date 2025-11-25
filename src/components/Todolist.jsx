// src/components/TodoList.jsx
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../store/todoStore';


function formatDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


function TodoList({selectedDate }) {
  // useRecoilState를 사용하여 상태를 읽고 업데이트 함수를 가져옵니다.
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [showCompleted, setShowCompleted] = useState(false);
  const [input, setInput] = useState('');
  const [memoModalOpen, setMemoModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [newMemo, setNewMemo] = useState('');
  const [editMemoId, setEditMemoId] = useState(null);
  const [editMemoText, setEditMemoText] = useState('');



  // 할 일 추가
  const handleAddTodo = () => {
    if (input.trim() === '') return;
    setTodoList([...todoList, 
      {
        id: Date.now(),
        title: input,
        isCompleted: false,
        dueDate: formatDateToString(selectedDate), // 날짜 문자열로
      }
    ]);
    setInput('');
  };

  // 선택된 날짜만 필터링
  const selectedDateStr = formatDateToString(selectedDate);
  const displayedTodos = showCompleted
    ? todoList.filter(todo => todo.isCompleted)
    : todoList.filter(todo => todo.dueDate === selectedDateStr);


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

  //메모장
  const handleAddMemo = () => {
    if (!selectedTodo || newMemo.trim() === '') return;
    const updatedTodo = {
      ...selectedTodo,
      memos: [
        ...(selectedTodo.memos || []),
        { id: Date.now(), text: newMemo }
      ]
    };
    setTodoList(list =>
      list.map(t => t.id === selectedTodo.id ? updatedTodo : t)
    );
    setSelectedTodo(updatedTodo);
    setNewMemo('');
  };

  const startEditMemo = (memo) => {
    setEditMemoId(memo.id);
    setEditMemoText(memo.text);
  };

  const saveEditMemo = () => {
    const updatedMemos = (selectedTodo.memos || []).map(memo =>
      memo.id === editMemoId ? { ...memo, text: editMemoText } : memo
    );
    const updatedTodo = { ...selectedTodo, memos: updatedMemos };
    setTodoList(list =>
      list.map(t => t.id === selectedTodo.id ? updatedTodo : t)
    );
    setSelectedTodo(updatedTodo);
    setEditMemoId(null);
    setEditMemoText('');
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
        <button onClick={() => setShowCompleted(prev => !prev)}>
          {showCompleted ? '전체 보기' : '완료함'}
        </button>
      </div>
      {displayedTodos.map(todo => (
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
          <span 
            onClick={() => { setSelectedTodo(todo); setMemoModalOpen(true); }}
            style={{ cursor: 'pointer', textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
          >
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
      {memoModalOpen && selectedTodo && (
        <div className="modal">
          <h3>{selectedTodo.title}</h3>
          {/* 메모 입력 */}
          <div style={{ display: 'flex', marginBottom: '1em' }}>
            <textarea
              value={newMemo}
              onChange={e => setNewMemo(e.target.value)}
              placeholder="메모를 입력하세요"
            />
            <button onClick={handleAddMemo}>저장</button>
            <button onClick={() => setMemoModalOpen(false)}>닫기</button>
          </div>
          {/* 메모 리스트 */}
          <ul>
            {(selectedTodo.memos || []).map(memo =>
              <li key={memo.id} style={{ marginBottom: '0.5em' }}>
                {editMemoId === memo.id ? (
                  <>
                    <input
                      value={editMemoText}
                      onChange={e => setEditMemoText(e.target.value)}
                    />
                    <button onClick={saveEditMemo}>저장</button>
                    <button onClick={() => setEditMemoId(null)}>취소</button>
                  </>
                ) : (
                  <>
                    {memo.text}
                    <button onClick={() => startEditMemo(memo)}>수정</button>
                  </>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoList;