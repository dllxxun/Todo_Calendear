function MyPage({ isDark, setIsDark, onLogout }) {
  return (
    <div style={{ maxWidth: "480px", margin: "40px auto 0" }}>
      <h2 style={{ marginBottom: "24px" }}>My 설정</h2>

      {/* 테마 설정 */}
      <section style={{ marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "8px" }}>테마</h3>
        <button
          onClick={() => setIsDark(false)}
          style={{ marginRight: "8px", padding: "6px 12px" }}
        >
          라이트 모드
        </button>
        <button
          onClick={() => setIsDark(true)}
          style={{ padding: "6px 12px" }}
        >
          다크 모드
        </button>
      </section>

      {/* 언어 설정 */}
      <section style={{ marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "8px" }}>언어</h3>
        <select
          defaultValue="ko"
          style={{ padding: "6px 10px", borderRadius: "4px" }}
          onChange={(e) => {
            alert(`언어 설정: ${e.target.value}`);
          }}
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
      </section>

      {/* 로그아웃 - 안전하게 처리 */}
      <section style={{ marginTop: "40px" }}>
        <button
          onClick={onLogout || (() => alert('로그아웃 완료!'))}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ef4444",
            background: "#fee2e2",
            color: "#b91c1c",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </section>
    </div>
  );
}

export default MyPage;
