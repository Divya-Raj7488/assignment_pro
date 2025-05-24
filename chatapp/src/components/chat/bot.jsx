import React, { useState, useRef, useEffect } from "react";
import "../../styles/bot.css";
import CustomProfile from "./CutomProfile";

const BotChatbox = () => {
  const [selectedTab, setSelectedTab] = useState("aibot");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      type: "bot",
      timestamp: "2:30 PM",
      isTyping: false,
    },
    {
      id: 2,
      text: "Hi! Can you explain what machine learning is?",
      type: "user",
      timestamp: "2:31 PM",
    },
    {
      id: 3,
      text:
        "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to analyze data, identify patterns, and make predictions or decisions.",
      type: "bot",
      timestamp: "2:31 PM",
      isTyping: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const sources = [
    { title: "Wikipedia", url: "https://wikipedia.org" },
    { title: "MIT OpenCourseWare", url: "https://ocw.mit.edu" },
    { title: "Nature Journal", url: "https://nature.com" },
    { title: "Stanford AI", url: "https://ai.stanford.edu" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = (text, messageId) => {
    let currentText = "";
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex];
        currentIndex++;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, text: currentText, isTyping: true }
              : msg
          )
        );
      } else {
        clearInterval(typingInterval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, isTyping: false } : msg
          )
        );
        setIsTyping(false);
      }
    }, 30 + Math.random() * 50);
  };

  const handleSend = () => {
    if (inputValue.trim() === "" || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      type: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponses = [
        "That's a great question! Let me provide you with a comprehensive answer based on the latest information available.",
        "I understand your inquiry. Here's what I can tell you about this topic from multiple reliable sources.",
        "Excellent point! Based on current research and data, here's a detailed explanation that should help clarify things.",
        "That's an interesting question that many people ask. Let me break this down for you with evidence-based information.",
        "I'm glad you asked about this. Here's a thorough explanation drawing from various authoritative sources.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessageId = Date.now() + 1;

      const botMessage = {
        id: botMessageId,
        text: "",
        type: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        isTyping: true,
      };

      setMessages((prev) => [...prev, botMessage]);
      simulateTyping(randomResponse, botMessageId);
    }, 800 + Math.random() * 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="botChatboxContainer">
      <div className="chatboxHeader">
        <div
          className={`${selectedTab === "aibot" ? "selected" : ""}`}
          onClick={() => {
            setSelectedTab("aibot");
          }}
        >
          AI Copilot
        </div>
        <div
          className={`${selectedTab === "details" ? "selected" : ""}`}
          onClick={() => {
            setSelectedTab("details");
          }}
        >
          Details
        </div>
      </div>

      <div className="messagesContainer2">
        {messages.map((message) => (
          <div key={message.id} className={`messageDiv ${message.type}`}>
            <div className="messageBubble">
              <CustomProfile
                name={`${message.type === "bot" ? "bot" : "user"}`}
              />
              <div
                className={
                  message.isTyping ? "typingText writing" : "typingText"
                }
              >
                {message.text}
              </div>
              {message.type === "bot" &&
                message.isTyping &&
                message.text === "" && (
                  <div className="typingIndicator">
                    <div className="typingDot"></div>
                    <div className="typingDot"></div>
                    <div className="typingDot"></div>
                  </div>
                )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="inputContainer">
        <textarea
          ref={inputRef}
          className="messageInput"
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows="1"
          disabled={isTyping}
        />
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={inputValue.trim() === "" || isTyping}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default BotChatbox;
