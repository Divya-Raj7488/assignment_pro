import React from "react";
import "../../styles/chat.css";
import MessengerComponent from "./ProfileContainer";
import Conversation from "./Conversation";
import BotChatbox from "./bot";

const ChatRoom = () => {
  return (
    <div className="chatContainer">
      <MessengerComponent />
      <Conversation />
      <BotChatbox />
    </div>
  );
};

export default ChatRoom;
