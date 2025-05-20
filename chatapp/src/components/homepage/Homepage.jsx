import React, { useState } from "react";
import "../../styles/homepage.css";
import ChatRoom from "../chat/ChatContainer";

const Homepage = () => {
  const [isChatVisible, setChatVisible] = useState(false);
  return (
    <div className="homepageContainer">
      <main className={`homepageMain ${isChatVisible ? "chatVisible" : ""}`}>
        <div className={`leftSidebar ${isChatVisible ? "collapsed" : ""}`}>
          <div className="forCopilotSign">
            <span className="dot"></span>
            <span className="forCopilotText">For Copilot</span>
          </div>
          <h1 className="leftSidebarTitle">Hello there</h1>
          <button
            className="startChatButton"
            onClick={() => setChatVisible(true)}
          >
            Start Chat
          </button>
        </div>
        <div
          className={`chatAnimationContainer ${
            isChatVisible ? "expanded" : ""
          }`}
        >
          {/* {!isChatVisible ? (
            <div className="animationContainer"></div>
          ) : (
            <ChatRoom />
          )} */}
          <div
            className={`animationContainer ${isChatVisible ? "expanded" : ""}`}
          ></div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
