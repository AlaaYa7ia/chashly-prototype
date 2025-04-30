import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Transfer from "./components/Transfer";

interface User {
  email: string;
  username: string;
  password: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  const [currentPage, setCurrentPage] = useState<
    "login" | "signup" | "dashboard" | "transfer"
  >("login");

  const [balance, setBalance] = useState<number>(() => {
    const stored = localStorage.getItem("balance");
    return stored ? Number(stored) : 150;
  });

  // Sync localStorage when states change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);

  const handleLogin = (email: string, password: string) => {
    const found = users.find(
      (user) => user.email === email && user.password === password
    );
    if (found) {
      setCurrentUser(found);
      setCurrentPage("dashboard");
    } else {
      alert("بيانات الدخول غير صحيحة");
    }
  };

  const handleSignup = (newUser: User) => {
    const emailExists = users.some((user) => user.email === newUser.email);
    const usernameExists = users.some(
      (user) => user.username === newUser.username
    );
    if (emailExists) {
      alert("البريد مستخدم مسبقاً");
    } else if (usernameExists) {
      alert("اسم المستخدم مستخدم مسبقاً");
    } else {
      setUsers([...users, newUser]);
      alert("تم التسجيل بنجاح. يمكنك الآن تسجيل الدخول.");
      setCurrentPage("login");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("login");
  };

  if (currentPage === "signup") {
    return (
      <Signup
        onSignup={handleSignup}
        goToLogin={() => setCurrentPage("login")}
      />
    );
  }

  if (!currentUser) {
    return (
      <Login
        onLogin={handleLogin}
        goToSignup={() => setCurrentPage("signup")}
      />
    );
  }

  return (
    <div className="app">
      {currentPage === "dashboard" ? (
        <Dashboard
          balance={balance}
          setBalance={setBalance}
          goToTransfer={() => setCurrentPage("transfer")}
          logout={handleLogout}
        />
      ) : (
        <Transfer
          balance={balance}
          setBalance={setBalance}
          logout={handleLogout}
          goBack={() => setCurrentPage("dashboard")}
          currentUser={currentUser}
          users={users}
        />
      )}
    </div>
  );
};

export default App;
