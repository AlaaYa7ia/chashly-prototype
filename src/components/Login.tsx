import React, { useState } from "react";

interface Props {
  onLogin: (email: string, password: string) => void;
  goToSignup: () => void;
}

const Login: React.FC<Props> = ({ onLogin, goToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("يرجى تعبئة البريد وكلمة المرور");
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
        <br />
        <button type="submit">دخول</button>
      </form>
      <p>
        ليس لديك حساب؟{" "}
        <button
          onClick={goToSignup}
          style={{ background: "none", border: "none", color: "blue" }}
        >
          إنشاء حساب
        </button>
      </p>
    </div>
  );
};

export default Login;
