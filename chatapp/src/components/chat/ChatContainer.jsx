import React from "react";
import "../../styles/chat.css";
import MessengerComponent from "./ProfileContainer";

const ChatRoom = () => {
  return (
    <div className="chatContainer">
      {/* <div className="recieverList"></div> */}
      <MessengerComponent />
      <div className="ChatContainer"></div>
      <div className="chatbotContainer"></div>
    </div>
  );
};

export default ChatRoom;
