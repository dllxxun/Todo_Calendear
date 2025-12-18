import "./LoginScreen.css";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";

function LoginScreen({ onLogin }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      onLogin(user); // 실제 Firebase 유저 전달
    } catch (error) {
      console.error(error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">My Todo & Calendar</h1>
        <p className="login-subtitle">하루의 할 일과 일정을 한 번에 관리하세요.</p>

        <button className="login-button" onClick={handleLogin}>
          Google 계정으로 로그인
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
