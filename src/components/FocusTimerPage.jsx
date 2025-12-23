// src/components/FocusTimerPage.jsx
import React, { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase"; // 경로 프로젝트에 맞게 확인

// 오늘 날짜 기준 키 만들기 (YYYY-MM, DD)
const getTodayKeys = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return { monthKey: `${yyyy}-${mm}`, dayKey: dd };
};

// 초 → MM:SS 포맷
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

function FocusTimerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25분
  const [viewMode, setViewMode] = useState("timer"); // "timer" | "calendar"

  const [monthlyData, setMonthlyData] = useState({}); // studyTime 전체
  const [todayStudyMinutes, setTodayStudyMinutes] = useState(0); // 오늘 공부 시간(분)

  // Firestore users/testUser 실시간 구독
  useEffect(() => {
    const userRef = doc(db, "users", "testUser"); // 문서 ID testUser 기준

    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      const studyTime = data.studyTime || {};
      setMonthlyData(studyTime);

      const { monthKey, dayKey } = getTodayKeys();
      const monthData = studyTime[monthKey] || {};
      const daysMap = monthData.days || {};
      const todayMinutes = daysMap[dayKey] || 0;
      setTodayStudyMinutes(todayMinutes);
    });

    return () => unsubscribe();
  }, []);

  // 타이머 로직
  useEffect(() => {
    let interval;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      alert("공부 타이머 종료! 25분 집중 완료! 🎉");
      addStudyTime(25); // 25분 누적
      setSecondsLeft(1500); // 다음 세션 위해 초기화
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  // Firestore에 공부 시간 누적 (월 총합 + 날짜별)
  const addStudyTime = async (minutes) => {
    const { monthKey, dayKey } = getTodayKeys();
    const userRef = doc(db, "users", "testUser");

    const monthData = monthlyData[monthKey] || {};
    const prevTotal = monthData.totalMinutes || 0;
    const daysMap = monthData.days || {};
    const prevDayMinutes = daysMap[dayKey] || 0;

    await updateDoc(userRef, {
      [`studyTime.${monthKey}.totalMinutes`]: prevTotal + minutes,
      [`studyTime.${monthKey}.days.${dayKey}`]: prevDayMinutes + minutes,
    });
  };

  const handleStartPause = () => {
    if (secondsLeft === 0) return;
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(1500);
  };

  // Firestore에 "오늘 공부 시간"으로 sessionMinutes를 더하는 함수
  const saveSessionToFirestore = async () => {
    if (sessionMinutes <= 0) {
      alert("저장할 공부 시간이 없어요!");
      return;
    }

    const { monthKey, dayKey } = getTodayKeys();
    const userRef = doc(db, "users", "testUser");

    const monthData = monthlyData[monthKey] || {};
    const prevTotal = monthData.totalMinutes || 0;
    const daysMap = monthData.days || {};
    const prevDayMinutes = daysMap[dayKey] || 0;

    await updateDoc(userRef, {
      [`studyTime.${monthKey}.totalMinutes`]: prevTotal + sessionMinutes,
      [`studyTime.${monthKey}.days.${dayKey}`]:
        prevDayMinutes + sessionMinutes,
    });

    alert(`${sessionMinutes}분을 오늘 공부 시간에 저장했어요!`);

    setSecondsLeft(1500);
    setIsRunning(false);
    setSessionMinutes(0);
  };

  // 이번 달 데이터
  const { monthKey: currentMonthKey } = getTodayKeys();
  const currentMonthData = monthlyData[currentMonthKey] || {};
  const currentMonthTotal = currentMonthData.totalMinutes || 0;
  const daysMap = currentMonthData.days || {};

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      {/* 상단 탭 */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <button
          onClick={() => setViewMode("timer")}
          style={{
            flex: 1,
            padding: "12px",
            border:
              viewMode === "timer"
                ? "2px solid #3b82f6"
                : "1px solid #e5e7eb",
            background: viewMode === "timer" ? "#eff6ff" : "#fff",
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          타이머
        </button>
        <button
          onClick={saveSessionToFirestore}
          style={{
            padding: "12px 22px",
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: "12px",
            border: "none",
            background: "#22c55e",   // 초록색 버튼
            color: "white",
            cursor: "pointer",
          }}
        >
          오늘 공부 시간에 저장
        </button>

        <button
          onClick={() => setViewMode("calendar")}
          style={{
            flex: 1,
            padding: "12px",
            border:
              viewMode === "calendar"
                ? "2px solid #10b981"
                : "1px solid #e5e7eb",
            background: viewMode === "calendar" ? "#ecfdf5" : "#fff",
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          이번달 공부
        </button>
      </div>

      {/* 타이머 화면 */}
      {viewMode === "timer" && (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: "8px" }}>공부 타이머</h2>

          {/* 오늘 공부 시간 박스 */}
          <div
            style={{
              marginBottom: "32px",
              padding: "16px",
              background: "#fef3c7",
              borderRadius: "12px",
              border: "1px solid #f59e0b",
            }}
          >
            <div
              style={{
                fontSize: "0.9rem",
                color: "#92400e",
                marginBottom: "4px",
              }}
            >
              오늘 공부 시간
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "#b45309",
              }}
            >
              {Math.floor(todayStudyMinutes / 60)}시간{" "}
              {todayStudyMinutes % 60}분
            </div>
          </div>

          {/* 타이머 박스 */}
          <div
            style={{
              padding: "40px 20px",
              background:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "24px",
              color: "white",
              maxWidth: "300px",
              margin: "0 auto 32px",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                fontWeight: 300,
                marginBottom: "8px",
              }}
            >
              {formatTime(secondsLeft)}
            </div>
            <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>
              {isRunning ? "집중 중..." : "시작하세요"}
            </div>
          </div>

          {/* 버튼들 */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleStartPause}
              disabled={secondsLeft === 0}
              style={{
                padding: "14px 28px",
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: "12px",
                border: "none",
                background: isRunning ? "#ef4444" : "#3b82f6",
                color: "white",
                cursor:
                  secondsLeft === 0 ? "not-allowed" : "pointer",
                opacity: secondsLeft === 0 ? 0.5 : 1,
              }}
            >
              {isRunning ? "일시정지" : "시작"}
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: "14px 28px",
                fontSize: "1rem",
                border: "1px solid #d1d5db",
                background: "white",
                borderRadius: "12px",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              리셋
            </button>
          </div>
        </div>
      )}

      {/* 캘린더(이번 달 공부) 화면 */}
      {viewMode === "calendar" && (
        <div>
          <h2 style={{ marginBottom: "8px", textAlign: "center" }}>
            이번달 공부 시간
          </h2>
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
              padding: "16px",
              background: "#ecfdf5",
              borderRadius: "12px",
              border: "1px solid #10b981",
            }}
          >
            <div
              style={{
                fontSize: "2.2rem",
                fontWeight: 700,
                color: "#065f46",
              }}
            >
              {Math.floor(currentMonthTotal / 60)}시간{" "}
              {currentMonthTotal % 60}분
            </div>
            <div
              style={{ fontSize: "0.95rem", color: "#047857" }}
            >
              {currentMonthKey} 총 공부 시간
            </div>
          </div>

          {/* 간단한 1~31일 그리드 (각 날짜 밑에 공부 시간) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(80px, 1fr))",
              gap: "12px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map(
              (day) => {
                const dayKey = String(day).padStart(2, "0");
                const dayMinutes = daysMap[dayKey] || 0;
                const dayHours = Math.floor(dayMinutes / 60);
                const dayMins = dayMinutes % 60;

                const hasStudy = dayMinutes > 0;

                return (
                  <div
                    key={day}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      background: hasStudy
                        ? "#dbeafe"
                        : "#f9fafb",
                      border: `2px solid ${
                        hasStudy ? "#3b82f6" : "#e5e7eb"
                      }`,
                      textAlign: "center",
                      fontSize: "0.85rem",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: "4px",
                      }}
                    >
                      {day}일
                    </div>
                    <div
                      style={{
                        color: hasStudy
                          ? "#1e40af"
                          : "#9ca3af",
                      }}
                    >
                      {hasStudy
                        ? `${dayHours > 0 ? `${dayHours}시간 ` : ""}${
                            dayMins
                          }분`
                        : "0분"}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FocusTimerPage;
