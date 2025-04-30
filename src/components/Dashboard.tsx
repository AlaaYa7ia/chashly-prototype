import React, { useState } from "react";

interface Props {
  balance: number;
  setBalance: (val: number) => void;
  goToTransfer: () => void;
  logout: () => void;
  showNotification: (msg: string, type: "success" | "error") => void;
}

const Dashboard: React.FC<Props> = ({
  balance,
  setBalance,
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
      setBalance(balance + num);
      showNotification(`تم إيداع ${num} كاشلي بنجاح.`, "success");
    } else if (action === "withdraw") {
      if (num > balance) {
        showNotification("الرصيد غير كافٍ", "error");
        return;
      }
      setBalance(balance - num);
      showNotification(`تم سحب ${num} كاشلي بنجاح.`, "success");
    }
    setAmount("");
    setAction(null);
  };

  return (
    <div className="container">
      <button
        onClick={logout}
        style={{ marginLeft: "10px", background: "red", color: "white" }}
      >
        تسجيل الخروج
      </button>
      <h2>لوحة التحكم</h2>
      <p>
        الرصيد: <strong>{balance} كاشلي</strong>
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
          <button onClick={() => setAction("deposit")}>إيداع</button>
          <button
            onClick={() => setAction("withdraw")}
            style={{ marginLeft: "10px" }}
          >
            سحب
          </button>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={goToTransfer}>تحويل</button>
      </div>
    </div>
  );
};

export default Dashboard;
