import React from "react";
import '../styles/message.css';

interface MessageBoxProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ type, message, onClose }) => {
  return (
    <div className={`messageBox ${type}`}>
      <span>{message}</span>
      <button className="closeBtn" onClick={onClose}>
        ✖
      </button>
    </div>
  );
};

export default MessageBox;
