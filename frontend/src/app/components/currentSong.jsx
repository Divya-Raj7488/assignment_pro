"use client";
import React, { useState } from "react";
import "../styles/card.css";
import { AiFillStepForward } from "react-icons/ai";
import { AiFillStepBackward } from "react-icons/ai";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { BsRepeat } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import pic from "../assets/Pic.svg";
import Image from "next/image";

export default function CurrentPlayingCard() {
  const [play, setPlay] = useState(false);
  return (
    <div className="currentSongCard">
      <div style={{ color: "white" }}>Currently Playing</div>
      <div className="artistImg">
        <Image
          src={pic}
          alt="artist"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="names">
        <div className="songName">Love your voice</div>
        <div className="title">Micheal Jackson</div>
      </div>
      <div className="animation">
        <span className="time">2:45</span>
        <span className="line">
          <span className="dot">
            <span className="dot2"></span>
          </span>
        </span>
        <span className="duration">5:56</span>
      </div>
      <div className="controlBox">
        <span>
          <BsRepeat className="controlIcons" />
        </span>
        <span>
          <AiFillStepBackward className="controlIcons" />
        </span>
        <span
          onClick={() => {
            setPlay(!play);
          }}
        >
          {play ? (
            <FaPlay className="controlIcons" />
          ) : (
            <FaPause className="controlIcons" />
          )}
        </span>
        <span>
          <AiFillStepForward className="controlIcons" />
        </span>
        <span>
          <FaRandom className="controlIcons" />
        </span>
      </div>
    </div>
  );
}
