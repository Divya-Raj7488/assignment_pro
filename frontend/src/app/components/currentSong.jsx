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

export default function CurrentPlayingCard({
  song,
  currentSongId,
  controlFlow,
  isPlaying,
  setIsPlaying,
}) {
  const [currentDuration, setCurrentDuration] = useState(0);
  const { songName, singer, duration } = song;
  const intervalIdRef = useRef(null);

  function countDuration() {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(() => {
      setCurrentDuration((prev) => {
        if (prev + 1 >= duration) {
          clearInterval(intervalIdRef.current);
          setCurrentDuration(0)
          return duration;
        }
        return prev + 1;
      });
    }, 1000);
  }

  useEffect(() => {
    countDuration();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [duration]);

  useEffect(() => {
    setIsPlaying(true);
  }, [currentSongId]);
  return (
    <div className="currentSongCard" key={currentSongId}>
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
      <div className="animation">
        <span className="time"> {Math.floor(currentDuration / 60)}:{Math.floor(currentDuration % 60)}</span>
        <span className="line">
          <span className="dot">
            <span className="dot2"></span>
          </span>
        </span>
        <span className="duration">
          {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
        </span>
      </div>
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
