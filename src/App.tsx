import React, { useEffect, useState } from "react";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Transfer from "./components/Transfer";

interface User {
  email: string;
  username: string;
  password: string;
  balance: number;
}

const App: React.FC = () => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

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
    return stored ? Number(stored) : 0;
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
      showNotification("تم تسجيل الدخول بنجاح.", "success");
    } else {
      showNotification("يانات الدخول غير صحيحة", "error");
    }
  };

  const handleSignup = (newUser: User) => {
    const emailExists = users.some((user) => user.email === newUser.email);
    const usernameExists = users.some(
      (user) => user.username === newUser.username
    );
    if (emailExists) {
      showNotification("البريد مستخدم مسبقاً", "error");
    } else if (usernameExists) {
      showNotification("اسم المستخدم مستخدم مسبقاً", "error");
    } else {
      setUsers([...users, newUser]);
      showNotification("تم التسجيل بنجاح. يمكنك الآن تسجيل الدخول.", "success");

      setCurrentPage("login");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("login");
  };

  return (
    <div className="App">
      <h1>محفظة كاشلي</h1>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {currentPage === "login" && (
        <Login
          onLogin={handleLogin}
          goToSignup={() => setCurrentPage("signup")}
          showNotification={showNotification}
        />
      )}

      {currentPage === "signup" && (
        <Signup
          onSignup={handleSignup}
          goToLogin={() => setCurrentPage("login")}
          showNotification={showNotification}
        />
      )}

      {currentPage === "dashboard" && currentUser && (
        <Dashboard
          // balance={balance}
          // setBalance={setBalance}
          setUsers={setUsers}
          currentUser={currentUser}
          users={users}
          goToTransfer={() => setCurrentPage("transfer")}
          logout={handleLogout}
          showNotification={showNotification}
        />
      )}

      {currentPage === "transfer" && currentUser && (
        <Transfer
          // balance={balance}
          // setBalance={setBalance}
          setUsers={setUsers}
          goBack={() => setCurrentPage("dashboard")}
          currentUser={currentUser}
          users={users}
          logout={handleLogout}
          showNotification={showNotification}
        />
      )}
    </div>
  );
};

export default App;
