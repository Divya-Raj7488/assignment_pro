import React, { useState, useRef, useEffect } from "react";
import "../../styles/conversation.css";
import data from "../../../data.json";
import CustomProfile from "./CutomProfile";
const conversations = data.conversations;
const Conversation = () => {
  const [messages, setMessages] = useState(conversations);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      type: "receiver",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const responses = [
        "Thanks for your message!",
        "I understand what you're saying.",
        "That's interesting!",
        "Got it, let me think about that.",
        "Sure, I can help with that.",
        "That makes sense.",
        "I appreciate you reaching out.",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const responseMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        type: "sender",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, responseMessage]);
    }, 1000 + Math.random() * 1000);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatboxContainer">
      <div className="messagesContainer">
        {messages.length === 0 ? (
          <div className="emptyState">
            <div className="emptyStateIcon">💬</div>
            <p>No messages yet</p>
            <p>Start a conversation by typing below!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="messageBubble">
                <CustomProfile name={"Me"} />
                <span className="txtBox">{message.text}</span>
                <span className="mssgTime">{message.timestamp}</span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="inputContainer">
        <textarea
          ref={inputRef}
          className="messageInput"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          rows="1"
        />
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={inputValue.trim() === ""}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default Conversation;
