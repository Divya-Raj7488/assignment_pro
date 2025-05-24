import { Bot } from "lucide-react";
import React from "react";

export default function BotIcon({ toggleBot, setToggleBot }) {
  const handleBotToggle = () => {
    setToggleBot(!toggleBot);
  };
  return (
    <div
      className="bot-toggle-icon"
      onClick={handleBotToggle}
      style={{
        position: "absolute",
        top: "10vh",
        right: "2rem",
        width: "50px",
        height: "50px",
        backgroundColor: toggleBot ? "#28a745" : "#007bff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
        zIndex: 1000,
        transition: "all 0.3s ease",
        border: "2px solid #fff",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.1)";
        e.target.style.backgroundColor = toggleBot ? "#1e7e34" : "#0056b3";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.backgroundColor = toggleBot ? "#28a745" : "#007bff";
      }}
    >
      <Bot size={24} color="white" />
    </div>
  );
}
