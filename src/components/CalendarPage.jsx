// src/components/CalendarPage.jsx
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css"; // 커스텀 스타일

function CalendarPage({ selectedDate, setSelectedDate }) {
  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h2>
          {selectedDate.getFullYear()}년{" "}
          {selectedDate.getMonth() + 1}월
        </h2>
      </div>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        locale="ko-KR"
        className="clean-calendar"
        calendarType="gregory"
        formatShortWeekday={(_, date) =>
          ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
        }
      />
    </div>
  );
}

export default CalendarPage;
