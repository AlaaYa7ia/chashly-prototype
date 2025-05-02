import React, { useState } from "react";
import {
  FaSignInAlt,
  FaUserPlus,
  FaMoneyBillWave,
  FaArrowRight,
  FaSignOutAlt,
  FaCheckCircle,
  FaMoneyBillWaveAlt,
  FaTimesCircle,
  FaMoneyCheckAlt,
  FaTradeFederation,
  FaCcVisa,
  FaRecycle,
} from "react-icons/fa";
import Notification from "./Notification";

interface User {
  email: string;
  username: string;
  password: string;
  balance: number;
}
interface Props {
  setUsers: (updatedUsers: User[]) => void;
  currentUser: User;
  setCurrentUser: (currentUser: User) => void;
  users: User[];
  goToTransfer: () => void;
  logout: () => void;
  showNotification: (msg: string, type: "success" | "error") => void;
  notification: {
    message: string;
    type: "success" | "error";
  } | null;
}

const Dashboard: React.FC<Props> = ({
  setUsers,
  setCurrentUser,
  currentUser,
  users,
  goToTransfer,
  logout,
  showNotification,
  notification,
}) => {
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState<"deposit" | "withdraw" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      showNotification("يرجى إدخال مبلغ صحيح.", "error");
      return;
    }

    if (action === "deposit") {
      const updatedUsers = users.map((user) => {
        if (user.username === currentUser.username) {
          setCurrentUser({ ...user, balance: user.balance + num });
          return { ...user, balance: user.balance + num };
        }
        return user;
      });

      setUsers(updatedUsers);

      showNotification(`تم إيداع ${num} كاشلي بنجاح.`, "success");
    } else if (action === "withdraw") {
      if (num > currentUser.balance) {
        showNotification("الرصيد غير كافٍ", "error");
        return;
      }
      const updatedUsers = users.map((user) => {
        if (user.username === currentUser.username) {
          setCurrentUser({ ...user, balance: user.balance - num });
          return { ...user, balance: user.balance - num };
        }
        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
      });

      setUsers(updatedUsers);

      showNotification(`تم سحب ${num} كاشلي بنجاح.`, "success");
    }
    setAmount("");
    setAction(null);
  };

  return (
    <div>
      <button title="تسجيل الخروج" className="logout-button" onClick={logout}>
        <FaSignOutAlt />
      </button>

      <div className="container">
        <h2>لوحة التحكم</h2>
        <p>
          الرصيد: <strong>{currentUser.balance} كاشلي</strong>
        </p>

        {action ? (
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="أدخل المبلغ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {notification && (
              <Notification
                message={notification.message}
                type={notification.type}
              />
            )}
            <br></br>
            <div className="dashboard-buttons" style={{ marginTop: "40px" }}>
              <button type="submit">
                <FaCheckCircle style={{ marginLeft: "8px" }} />
                تأكيد
              </button>
              <button
                type="button"
                onClick={() => {
                  setAction(null);
                  setAmount("");
                }}
              >
                <FaTimesCircle style={{ marginLeft: "8px" }} />
                إلغاء
              </button>
            </div>
          </form>
        ) : (
          <>
            {notification && (
              <Notification
                message={notification.message}
                type={notification.type}
              />
            )}
            <br></br>
            <div className="dashboard-buttons" style={{ marginTop: "40px" }}>
              <button onClick={() => setAction("deposit")}>
                <FaMoneyBillWave style={{ marginLeft: "8px" }} />
                إيداع
              </button>
              <button onClick={() => setAction("withdraw")}>
                <FaMoneyCheckAlt style={{ marginLeft: "8px" }} />
                سحب
              </button>
            </div>
          </>
        )}

        <div style={{ marginTop: "20px" }}>
          <button onClick={goToTransfer}>
            <FaRecycle style={{ marginLeft: "8px" }} />
            تحويل
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
