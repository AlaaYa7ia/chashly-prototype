import React, { useState } from "react";

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
}

const Dashboard: React.FC<Props> = ({
  setUsers,
  setCurrentUser,
  currentUser,
  users,
  goToTransfer,
  logout,
  showNotification,
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
      {/* <button onClick={logout} style={{ width: "30%", background: "#991b1b" }}>
        تسجيل الخروج
      </button> */}
      <button className="logout-button" onClick={logout}>
        تسجيل الخروج
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
            <button type="submit">تأكيد</button>
            <button
              type="button"
              onClick={() => {
                setAction(null);
                setAmount("");
              }}
            >
              إلغاء
            </button>
          </form>
        ) : (
          <>
            <div className="dashboard-buttons">
              <button onClick={() => setAction("deposit")}>إيداع</button>
              <button onClick={() => setAction("withdraw")}>سحب</button>
            </div>
          </>
        )}

        <div style={{ marginTop: "20px" }}>
          <button onClick={goToTransfer}>تحويل</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
