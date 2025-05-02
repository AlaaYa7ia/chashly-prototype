// src/components/Notification.tsx
import React from "react";

interface Props {
  message: string;
  type: "success" | "error";
}

const Notification: React.FC<Props> = ({ message, type }) => {
  if (!message) return null;

  return (
    <div
      className="notification"
      style={{
        backgroundColor: type === "success" ? "#d1fae5" : "#fee2e2",
        color: type === "success" ? "#065f46" : "#991b1b",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
