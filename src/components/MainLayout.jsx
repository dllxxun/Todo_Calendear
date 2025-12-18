// src/components/MainLayout.jsx
import Todolist from "./Todolist";
import CalendarView from "./CalendarView";
import "./MainLayout.css";

function MainLayout({ user, onLogout }) {
  return (
    <div className="layout-root">
      <header className="layout-header">
        <h2 className="layout-title">My Todo & Calendar</h2>
        <div className="layout-header-right">
          <span className="layout-username">
            {user?.displayName || "User"}
          </span>
          <button className="logout-button" onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </header>

      <main className="layout-main">
        <section className="layout-panel">
          <h3 className="panel-title">할 일 목록</h3>
          <Todolist />
        </section>

        <section className="layout-panel">
          <h3 className="panel-title">캘린더</h3>
          <CalendarView />
        </section>
      </main>
    </div>
  );
}

export default MainLayout;
