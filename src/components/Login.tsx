import React, { useState } from "react";
import Notification from "./Notification";

interface Props {
  onLogin: (email: string, password: string) => void;
  goToSignup: () => void;
  showNotification: (msg: string, type: "success" | "error") => void;
  notification: {
    message: string;
    type: "success" | "error";
  } | null;
}

const Login: React.FC<Props> = ({
  onLogin,
  goToSignup,
  showNotification,
  notification,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showNotification("يرجى تعبئة البريد وكلمة المرور.", "error");
    } else {
      onLogin(email, password);
    }
  };

  return (
    <div className="container">
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
        <br />

        <button type="submit" style={{ marginTop: "40px" }}>
          دخول
        </button>
      </form>
      <p>ليس لديك حساب؟ </p>
      <button
        onClick={goToSignup}
        style={{
          background: "none",
          border: "none",
          color: "#9b96f4",
          margin: "0%",
        }}
      >
        إنشاء حساب
      </button>
    </div>
  );
};

export default Login;
