"use state";
import React, { useState } from "react";
import "../styles/card.css";
import { BsMusicNoteBeamed } from "react-icons/bs";

export default function QueueCard(props) {
  const { id, songName, album, singer, songSrc } = props.songs;
  return (
    <div
      className="queueCard"
      style={
        props.currentSongId == id
          ? { backgroundColor: "#520000" }
          : { backgroundColor: "transparent" }
      }
    >
      <span className="index">
        {props.currentSongId == id ? (
          <BsMusicNoteBeamed style={{ color: "white" }} />
        ) : (
          <span>{id + 1}</span>
        )}
      </span>
      <span className="songImg">
      </span>
      <span className="songName"> {songName} </span>
      <span className="Album">{album} </span>
    </div>
  );
}
