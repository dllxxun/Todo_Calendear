// src/components/TodoList.jsx
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../store/todoStore";


import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function formatDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function TodoList({ selectedDate }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [showCompleted, setShowCompleted] = useState(false);
  const [input, setInput] = useState("");
  const [memoModalOpen, setMemoModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [newMemo, setNewMemo] = useState("");
  const [editMemoId, setEditMemoId] = useState(null);
  const [editMemoText, setEditMemoText] = useState("");

  const selectedDateStr = formatDateToString(selectedDate);

  // ✅ 1. Firestore에서 현재 날짜의 todo 불러오기
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const q = query(
          collection(db, "todos"),
          where("dueDate", "==", selectedDateStr)
          // 나중에 where("uid","==",user.uid)도 추가할 예정
        );

        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodoList(list);
      } catch (e) {
        console.error("할 일 불러오기 실패:", e);
      }
    };

    fetchTodos();
  }, [selectedDateStr, setTodoList]);

  // ✅ 2. Firestore에 새 todo 추가
  const handleAddTodo = async () => {
    if (input.trim() === "") return;

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title: input,
        isCompleted: false,
        dueDate: selectedDateStr,
        createdAt: Date.now(),
      });

      setTodoList((prev) => [
        ...prev,
        {
          id: docRef.id,
          title: input,
          isCompleted: false,
          dueDate: selectedDateStr,
        },
      ]);

      setInput("");
    } catch (e) {
      console.error("할 일 추가 실패:", e);
      alert("할 일을 저장하는 데 실패했습니다.");
    }
  };

  // 선택된 날짜만 필터링 + 완료함 보기
  const displayedTodos = showCompleted
    ? todoList.filter((todo) => todo.isCompleted)
    : todoList.filter((todo) => todo.dueDate === selectedDateStr);

  // 나머지(삭제, 토글, 메모)는 일단 로컬 상태 그대로 유지
  const handleDeleteTodo = (id) => {
    setTodoList((list) => list.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodoList((oldTodoList) =>
      oldTodoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleAddMemo = () => {
    if (!selectedTodo || newMemo.trim() === "") return;
    const updatedTodo = {
      ...selectedTodo,
      memos: [
        ...(selectedTodo.memos || []),
        { id: Date.now(), text: newMemo },
      ],
    };
    setTodoList((list) =>
      list.map((t) => (t.id === selectedTodo.id ? updatedTodo : t))
    );
    setSelectedTodo(updatedTodo);
    setNewMemo("");
  };

  const startEditMemo = (memo) => {
    setEditMemoId(memo.id);
    setEditMemoText(memo.text);
  };

  const saveEditMemo = () => {
    const updatedMemos = (selectedTodo.memos || []).map((memo) =>
      memo.id === editMemoId ? { ...memo, text: editMemoText } : memo
    );
    const updatedTodo = { ...selectedTodo, memos: updatedMemos };
    setTodoList((list) =>
      list.map((t) => (t.id === selectedTodo.id ? updatedTodo : t))
    );
    setSelectedTodo(updatedTodo);
    setEditMemoId(null);
    setEditMemoText("");
  };

  return (
    <div>
      <h2>📌 오늘의 할 일</h2>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          style={{ flex: 1, marginRight: "10px" }}
          onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>추가</button>
        <button onClick={() => setShowCompleted((prev) => !prev)}>
          {showCompleted ? "전체 보기" : "완료함"}
        </button>
      </div>

      {displayedTodos.map((todo) => (
        <div
          key={todo.id}
          style={{
            padding: "10px",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => toggleComplete(todo.id)}
            style={{ marginRight: "10px" }}
          />
          <span
            onClick={() => {
              setSelectedTodo(todo);
              setMemoModalOpen(true);
            }}
            style={{
              cursor: "pointer",
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </span>
          <small style={{ marginLeft: "auto", color: "#888" }}>
            ({todo.dueDate})
          </small>
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            style={{
              marginLeft: "10px",
              color: "red",
              border: "none",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>
      ))}

      {memoModalOpen && selectedTodo && (
        <div className="modal">
          <h3>{selectedTodo.title}</h3>
          <div style={{ display: "flex", marginBottom: "1em" }}>
            <textarea
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value)}
              placeholder="메모를 입력하세요"
            />
            <button onClick={handleAddMemo}>저장</button>
            <button onClick={() => setMemoModalOpen(false)}>닫기</button>
          </div>
          <ul>
            {(selectedTodo.memos || []).map((memo) => (
              <li key={memo.id} style={{ marginBottom: "0.5em" }}>
                {editMemoId === memo.id ? (
                  <>
                    <input
                      value={editMemoText}
                      onChange={(e) => setEditMemoText(e.target.value)}
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
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoList;
