import React, { useEffect, useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage || "login";
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

  const handleLogin = (email: string, password: string) => {
    const found = users.find(
      (user) => user.email === email && user.password === password
    );
    if (found) {
      setCurrentUser(found);
      setCurrentPage("dashboard");
      localStorage.setItem("currentPage", "dashboard");
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
      localStorage.setItem("currentPage", "login");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setCurrentPage("login");
    localStorage.setItem("currentPage", "login");
  };

  return (
    <div>
      <div className="header">
        <h1>محفظة كاشلي</h1>
      </div>
      <div className="App">
        {/* {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )} */}

        {currentPage === "login" && (
          <Login
            onLogin={handleLogin}
            goToSignup={() => setCurrentPage("signup")}
            showNotification={showNotification}
            notification={notification}
          />
        )}

        {currentPage === "signup" && (
          <Signup
            onSignup={handleSignup}
            goToLogin={() => setCurrentPage("login")}
            showNotification={showNotification}
            notification={notification}
          />
        )}

        {currentPage === "dashboard" && currentUser && (
          <Dashboard
            setUsers={setUsers}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            users={users}
            goToTransfer={() => setCurrentPage("transfer")}
            logout={handleLogout}
            showNotification={showNotification}
            notification={notification}
          />
        )}

        {currentPage === "transfer" && currentUser && (
          <Transfer
            setUsers={setUsers}
            goBack={() => setCurrentPage("dashboard")}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            users={users}
            logout={handleLogout}
            showNotification={showNotification}
            notification={notification}
          />
        )}
      </div>
    </div>
  );
};

export default App;
