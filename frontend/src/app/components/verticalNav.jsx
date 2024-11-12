import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import "../styles/nav.css";

export default function VerticalNav() {
  return (
    <div className="verticalNavbar">
      <div style={{ color: "white" }} className="title">Menu</div>
      <div className="iconAndName">
        <span>
          <AiFillHome
            style={{ width: "26px", height: "26px", color: "white" }}
          />
        </span>
        <span style={{ color: "white" }} className="title">
          Home
        </span>
      </div>
      <div className="iconAndName">
        <span>
          <AiOutlineStock
            style={{ width: "26px", height: "26px", color: "white" }}
          />
        </span>
        <span style={{ color: "white" }} className="title">
          Trends
        </span>
      </div>
      <div className="iconAndName">
        <span>
          <BsMusicNoteBeamed
            style={{ width: "26px", height: "26px", color: "white" }}
          />
        </span>
        <span style={{ color: "white" }} className="title">
          Music
        </span>
      </div>
      <div className="iconAndName">
        <span>
          <BsFillArrowUpRightCircleFill
            style={{ width: "26px", height: "26px", color: "white" }}
          />
        </span>
        <span style={{ color: "white" }} className="title">
          Discover
        </span>
      </div>
    </div>
  );
}

export const BottomNav = () => {
  return (
    <div className="verticalNavbar2">
      <div style={{ color: "white" }} className="title">Menu</div>
      <div className="iconAndName">
        <span>
          <AiFillSetting
            style={{ width: "26px", height: "26px", color: "white" }}
          />
        </span>
        <span style={{ color: "white" }} className="title">
          Settings
        </span>
      </div>
      <div className="iconAndName">
        <span>
          <AiOutlineLogout
            style={{ width: "26px", height: "26px", color: "white" }}
          />
        </span>
        <span style={{ color: "white" }} className="title">
          Logout
        </span>
      </div>
    </div>
  );
};
