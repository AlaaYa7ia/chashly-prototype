import React, { useState } from "react";

interface Props {
  onSignup: (user: {
    email: string;
    username: string;
    password: string;
  }) => void;
  goToLogin: () => void;
}

const Signup: React.FC<Props> = ({ onSignup, goToLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username || !password || !confirm) {
      alert("يرجى تعبئة جميع الحقول");
    } else if (password !== confirm) {
      alert("كلمتا المرور غير متطابقتين");
    } else {
      onSignup({ email, username, password });
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
        <br />
        <button type="submit">تسجيل</button>
      </form>
      <p>
        لديك حساب؟{" "}
        <button
          onClick={goToLogin}
          style={{ background: "none", border: "none", color: "blue" }}
        >
          تسجيل الدخول
        </button>
      </p>
    </div>
  );
};

export default Signup;
