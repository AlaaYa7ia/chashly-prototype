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
}

const Transfer: React.FC<Props> = ({
  balance,
  setBalance,
  currentUser,
  users,
  goBack,
  logout,
}) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      alert("يرجى إدخال مبلغ صحيح");
      return;
    }

    if (recipient === currentUser.username) {
      alert("لا يمكنك تحويل رصيد لنفسك");
      return;
    }

    const userExists = users.some((u) => u.username === recipient);
    if (!userExists) {
      alert("اسم المستخدم غير موجود");
      return;
    }

    if (num > balance) {
      alert("الرصيد غير كافٍ");
      return;
    }

    setBalance(balance - num);
    alert(`تم تحويل ${num} كاشلي إلى ${recipient}`);
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
