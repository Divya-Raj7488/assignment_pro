import React, { useEffect, useRef, useState } from "react";
import "../../styles/profile.css";
import data from "../../../data.json";
const messages = data.messages;
console.log(messages);

const MessengerComponent = () => {
  const loaderRef = useRef(null);
  const [conversations, setConversations] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setConversations(messages.slice(0, 10));
  }, []);
  const getRandomColor = (name) => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
      "#F8C471",
      "#82E0AA",
      "#F1948A",
      "#85C1E9",
      "#A569BD",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };
  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };
  const truncateMessage = (message, maxLength = 35) => {
    return message && message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
  };

  useEffect(() => {
    const option = {
      root: document.querySelector(".conversationList"),
      rootMargin: "0px",
      threshold: 1.0,
    };
    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        console.log("loaded");
        setConversations((prev) => {
          setLoading(true);
          let newChats = messages.slice(prev.length + 1, prev.length + 10);
          return [...prev, ...newChats];
        });
        setLoading(false);
      }
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  const Profile = ({ conversation }) => {
    return (
      <div
        key={conversation.id}
        className="conversationItem"
        onMouseEnter={(e) =>
          e.currentTarget.classList.add("conversationItemHover")
        }
        onMouseLeave={(e) =>
          e.currentTarget.classList.remove("conversationItemHover")
        }
      >
        <div
          className="profileIcon"
          style={{ backgroundColor: getRandomColor(conversation.name || "") }}
        >
          {getInitials(conversation.name || "")}
        </div>
        <div className="conversationDetails">
          <div className="conversationHeader">
            <h3 className="senderName">{conversation.name}</h3>
            <span className="timeStamp">{conversation.time}</span>
          </div>
          <div className="conversationBody">
            <div className="conversationContent">
              <p className="company">{conversation.company}</p>
              <p className="message">{truncateMessage(conversation.message)}</p>
            </div>
            {conversation.unread > 0 && (
              <div className="unreadBadge">{conversation.unread}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="searchContainer">
        <div className="searchWrapper">
          <input
            type="text"
            placeholder="Search conversations..."
            className="searchInput"
            onFocus={(e) => e.target.classList.add("searchInputFocus")}
            onBlur={(e) => e.target.classList.remove("searchInputFocus")}
          />
          <div className="searchIcon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="conversationList">
        {conversations.length > 0 &&
          conversations.map((conversation) => (
            <Profile key={conversation.id} conversation={conversation} />
          ))}
        {loading && <div>!!!!yayyy!!!!</div>}
        <div
          ref={loaderRef}
          style={{ height: "20px", background: "transparent" }}
          className="chatLoader"
        >
          End
        </div>
      </div>
    </div>
  );
};

export default MessengerComponent;
