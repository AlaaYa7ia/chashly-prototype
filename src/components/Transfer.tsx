import React, { useState } from "react";

interface User {
  email: string;
  username: string;
  password: string;
}

interface Props {
  balance: number;
  setBalance: (val: number) => void;
  currentUser: User;
  users: User[];
  goBack: () => void;
  logout: () => void;

  showNotification: (msg: string, type: "success" | "error") => void;
}

const Transfer: React.FC<Props> = ({
  balance,
  setBalance,
  currentUser,
  users,
  goBack,
  logout,
  showNotification,
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

    if (num > balance) {
      showNotification("الرصيد غير كافٍ", "error");
      return;
    }

    setBalance(balance - num);
    showNotification(`تم تحويل ${num} كاشلي إلى ${recipient}`, "success");
    setRecipient("");
    setAmount("");
    goBack();
  };

  return (
    <div className="container">
      <button
        onClick={logout}
        style={{ marginLeft: "10px", background: "red", color: "white" }}
      >
        تسجيل الخروج
      </button>
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
        <button type="submit">تحويل</button>
        <button type="button" onClick={goBack}>
          رجوع
        </button>
      </form>
    </div>
  );
};

export default Transfer;
