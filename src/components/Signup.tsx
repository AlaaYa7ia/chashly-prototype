import React, { useState } from "react";
import Notification from "./Notification";

interface Props {
  onSignup: (user: {
    email: string;
    username: string;
    password: string;
    balance: number;
  }) => void;
  goToLogin: () => void;
  showNotification: (msg: string, type: "success" | "error") => void;
  notification: {
    message: string;
    type: "success" | "error";
  } | null;
}

const Signup: React.FC<Props> = ({
  onSignup,
  goToLogin,
  showNotification,
  notification,
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const balance = 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username || !password || !confirm) {
      showNotification("يرجى تعبئة جميع الحقول.", "error");
    } else if (password !== confirm) {
      showNotification("كلمتا المرور غير متطابقتين.", "error");
    } else {
      onSignup({ email, username, password, balance });
    }
  };

  return (
    <div className="container">
      <h2>إنشاء حساب كاشلي</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="username"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="تأكيد كلمة المرور"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
        <br />
        <button type="submit" style={{ marginTop: "40px" }}>
          تسجيل
        </button>
      </form>
      <p>لديك حساب؟ </p>
      <button
        onClick={goToLogin}
        style={{
          background: "none",
          border: "none",
          color: "#9b96f4",
          margin: "0%",
        }}
      >
        تسجيل الدخول
      </button>
    </div>
  );
};

export default Signup;
