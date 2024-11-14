"use state";
import React, { useState } from "react";
import "../styles/card.css";
import { BsMusicNoteBeamed } from "react-icons/bs";

export default function QueueCard(props) {
  const { id, songName, album, singer, songSrc } = props.songs;
  console.log("isPlaying", props.isPlaying);
  return (
    <div
      className="queueCard"
      style={
        props.isPlaying == id
          ? { backgroundColor: "#520000" }
          : { backgroundColor: "transparent" }
      }
    >
      <span className="index">
        {props.isPlaying == id ? (
          <BsMusicNoteBeamed style={{ color: "white" }} />
        ) : (
          <span>{id + 1}</span>
        )}
      </span>
      <span className="songImg">
        {/* <Image src={songImg} alt="" /> */}
        {/* {songImg} */}
      </span>
      <span className="songName"> {songName} </span>
      <span className="Album">{album} </span>
    </div>
  );
}
