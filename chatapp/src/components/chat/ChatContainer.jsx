import React, { useEffect, useState } from "react";
import "../../styles/chat.css";
import MessengerComponent from "./ProfileContainer";
import Conversation from "./Conversation";
import BotChatbox from "./bot";
import BotIcon from "./BotIcon";

const ChatRoom = () => {
  const [currentSenderProfile, setCurrentSenderProfile] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [renderId, setRenderId] = useState(1);
  const [toggleBot, setToggleBot] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="chatContainer">
      {(!isMobile || (isMobile && renderId === 1)) && (
        <MessengerComponent
          setCurrentSenderProfile={setCurrentSenderProfile}
          isMobile={isMobile}
          setRenderId={setRenderId}
        />
      )}

      {(!isMobile || (isMobile && renderId === 2)) && (
        <Conversation
          currentSenderProfile={currentSenderProfile}
          isMobile={isMobile}
          setRenderId={setRenderId}
        />
      )}
      {(!isMobile || (isMobile && toggleBot)) && (
        <BotChatbox
          isMobile={isMobile}
          setToggleBot={setToggleBot}
          toggleBot={toggleBot}
        />
      )}
      {isMobile && !toggleBot && (
        <BotIcon toggleBot={toggleBot} setToggleBot={setToggleBot} />
      )}
    </div>
  );
};

export default ChatRoom;
