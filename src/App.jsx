// src/App.jsx
import './App.css'; 
import TodoList from './components/Todolist'; 

function App() {
  return (
    <div className="App">
      <header>
        <h1>🗓️ Todo & Calendar Project</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <TodoList />
      </main>
    </div>
  );
}

export default App;