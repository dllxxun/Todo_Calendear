import "./LoginScreen.css";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";

function LoginScreen({ onLogin }) {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin(result.user); // 실제 Firebase 유저 전달
    } catch (error) {
      console.error(error);
      alert("Google 로그인 중 오류가 발생했습니다.");
    }
  };

  const handleSignupClick = () => {
    // TODO: 나중에 이메일 회원가입 모달/페이지 열기
    alert("회원가입 기능은 추후 추가될 예정입니다.");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* 로고 자리 */}
        <div className="login-logo">🗓️</div>

        <h1 className="login-title">My Todo &amp; Calendar</h1>
        <p className="login-subtitle">
          하루의 할 일과 일정을 한 번에 관리하세요.
        </p>

        <button
          className="login-main-button"
          onClick={handleGoogleLogin}
        >
          Google 계정으로 로그인
        </button>

        <button
          className="login-sub-button"
          onClick={handleSignupClick}
        >
          이메일로 회원가입
        </button>

        <p className="login-help">
          학교 과제용 데모 서비스입니다.
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;
