"use client";
import React, { useEffect, useRef, useState } from "react";
import "../styles/card.css";
import { AiFillStepForward } from "react-icons/ai";
import { AiFillStepBackward } from "react-icons/ai";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { BsRepeat } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import pic from "../assets/Pic.svg";
import Image from "next/image";

export default function CurrentPlayingCard(props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const { id, songName, album, singer, songSrc } = props.song;
  const { controlFlow } = props;
  return (
    <div className="currentSongCard" key={id}>
      <div style={{ color: "white" }}>Currently Playing</div>
      <div className="artistImg">
        <Image
          src={pic}
          alt="artist"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="names">
        <div className="songName">{songName}</div>
        <div className="title2">{singer}</div>
      </div>
      {/* <div className="animation">
        <span className="time">2:45</span>
        <span className="line">
          <span className="dot">
            <span className="dot2"></span>
          </span>
        </span>
        <span className="duration">5:56</span>
      </div> */}
      <div className="controlBox">
        <span>
          <BsRepeat className="controlIcons" onClick={controlFlow.repeatSong} />
        </span>
        <span>
          <AiFillStepBackward
            className="controlIcons"
            onClick={controlFlow.PlayPrevious}
          />
        </span>
        <span>
          {isPlaying ? (
            <FaPause
              className="controlIcons"
              onClick={() => {
                controlFlow.pauseSong();
                setIsPlaying(false);
              }}
            />
          ) : (
            <FaPlay
              className="controlIcons"
              onClick={() => {
                controlFlow.resumeSong();
                setIsPlaying(true);
              }}
            />
          )}
        </span>
        <span>
          <AiFillStepForward
            className="controlIcons"
            onClick={controlFlow.playNext}
          />
        </span>
        <span>
          <FaRandom className="controlIcons" onClick={controlFlow.randomSong} />
        </span>
      </div>
    </div>
  );
}
