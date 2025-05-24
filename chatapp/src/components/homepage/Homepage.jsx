import React, { useState } from "react";
import "../../styles/homepage.css";
import ChatRoom from "../chat/ChatContainer";
import { BookText } from "lucide-react";

const Homepage = () => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [headerOption, setHeaderOption] = useState("aibot");
  return (
    <div className="homepageContainer">
      <main className={`homepageMain ${isChatVisible ? "chatVisible" : ""}`}>
        <div className={`leftSidebar ${isChatVisible ? "collapsed" : ""}`}>
          <div className="contentContainer">
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
        </div>
        <div
          className={`chatAnimationContainer ${
            isChatVisible ? "expanded" : ""
          }`}
        >
          {!isChatVisible ? (
            <div className="animationContainer">
              <div className="animationHeader">
                <span
                  className={`optionsInAnimationHeader ${
                    headerOption === "aibot" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setHeaderOption("aibot");
                  }}
                >
                  AI Copilot
                </span>
                <span
                  onClick={() => {
                    setHeaderOption("details");
                  }}
                  className={`optionsInAnimationHeader ${
                    headerOption === "details" ? "selected" : ""
                  }`}
                >
                  Details
                </span>
              </div>
              <div className="botNameAndIntro">
                <div>
                  <BookText style={{ width: "1rem", height: "1rem" }} />
                </div>
                <div style={{ fontWeight: "700" }}>Hi, I'm Fin AI Copilot</div>
                <div>Ask me anything about this conversation</div>
              </div>
            </div>
          ) : (
            <ChatRoom isChatVisible={isChatVisible} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
