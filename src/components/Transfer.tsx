import React, { useState } from "react";
import Notification from "./Notification";
import {
  FaSignInAlt,
  FaUserPlus,
  FaMoneyBillWave,
  FaArrowRight,
  FaSignOutAlt,
  FaMoneyBillWaveAlt,
  FaRecycle,
} from "react-icons/fa";
interface User {
  email: string;
  username: string;
  password: string;
  balance: number;
}

interface Props {
  setUsers: (updatedUsers: User[]) => void;
  setCurrentUser: (currentUser: User) => void;
  currentUser: User;
  users: User[];
  goBack: () => void;
  logout: () => void;
  showNotification: (msg: string, type: "success" | "error") => void;
  notification: {
    message: string;
    type: "success" | "error";
  } | null;
}

const Transfer: React.FC<Props> = ({
  setUsers,
  currentUser,
  setCurrentUser,
  users,
  goBack,
  logout,
  showNotification,
  notification,
}) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      showNotification("يرجى إدخال مبلغ صحيح", "error");
      return;
    }

    if (recipient === currentUser.username) {
      showNotification("لا يمكنك تحويل رصيد لنفسك", "error");
      return;
    }

    const userExists = users.some((u) => u.username === recipient);
    if (!userExists) {
      showNotification("اسم المستخدم غير موجود", "error");
      return;
    }

    if (num > currentUser.balance) {
      showNotification("الرصيد غير كافٍ", "error");
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.username === currentUser.username) {
        setCurrentUser({ ...user, balance: user.balance - parseInt(amount) });
        return { ...user, balance: user.balance - parseInt(amount) };
      }
      if (user.username === recipient) {
        return { ...user, balance: user.balance + parseInt(amount) };
      }
      return user;
    });

    setUsers(updatedUsers);

    showNotification(`تم تحويل ${num} كاشلي إلى ${recipient}`, "success");
    setRecipient("");
    setAmount("");
    goBack();
  };

  return (
    <div>
      <button title="تسجيل الخروج" className="logout-button" onClick={logout}>
        <FaSignOutAlt />
      </button>

      <div className="container">
        <h2>تحويل مبلغ</h2>
        <form onSubmit={handleTransfer}>
          <input
            type="text"
            placeholder="اسم المستلم"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            type="number"
            placeholder="المبلغ"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}
          <div className="dashboard-buttons">
            <button type="submit" style={{ marginTop: "40px" }}>
              <FaRecycle style={{ marginLeft: "8px" }} />
              تحويل
            </button>
            <button
              type="button"
              style={{ marginTop: "40px" }}
              onClick={goBack}
            >
              <FaArrowRight style={{ marginLeft: "8px" }} />
              رجوع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
