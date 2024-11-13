"use state";
import React, { useState } from "react";
import "../styles/card.css";
import { BsMusicNoteBeamed } from "react-icons/bs";

export default function QueueCard(props) {
  // const { index, songName, songImg, duration, album } = props;
  const isPlaying = props.keys;
  // const index = 1;
  return (
    <div
      className="queueCard"
      style={
        isPlaying == props.isPlaying
          ? { backgroundColor: "#520000" }
          : { backgroundColor: "transparent" }
      }
    >
      <span className="index">
        {isPlaying == props.isPlaying ? (
          <BsMusicNoteBeamed style={{ color: "white" }} />
        ) : (
          <span>{props.keys}</span>
        )}
      </span>
      <span className="songImg">
        {/* <Image src={songImg} alt="" /> */}
        {/* {songImg} */}
      </span>
      {/* <span className="songName"> {songName} </span> */}
      {/* <span className="Duration"> {duration} </span> */}
      {/* <span className="Album">{album} </span> */}
    </div>
  );
}
