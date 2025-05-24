import React, { useState } from "react";
import "../../styles/chat.css";
import MessengerComponent from "./ProfileContainer";
import Conversation from "./Conversation";
import BotChatbox from "./bot";

const ChatRoom = () => {
  const [currentSenderProfile, setCurrentSenderProfile] = useState({});
  return (
    <div className="chatContainer">
      <MessengerComponent setCurrentSenderProfile={setCurrentSenderProfile} />
      <Conversation currentSenderProfile={currentSenderProfile} />
      <BotChatbox />
    </div>
  );
};

export default ChatRoom;
