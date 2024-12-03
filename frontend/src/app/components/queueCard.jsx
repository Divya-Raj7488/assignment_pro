"use state";
import React, { useState } from "react";
import "../styles/card.css";
import { BsMusicNoteBeamed } from "react-icons/bs";

export default function QueueCard({ songs, currentSongId, idx }) {
  const { id, songName, album, singer, songSrc } = songs;
  return (
    <div
      className="queueCard"
      style={
        currentSongId == idx
          ? { backgroundColor: "#520000" }
          : { backgroundColor: "transparent" }
      }
    >
      <span className="index">
        {currentSongId == idx ? (
          <BsMusicNoteBeamed style={{ color: "white" }} />
        ) : (
          <span>{idx + 1}</span>
        )}
      </span>
      <span className="songImg"></span>
      <span className="songName"> {songName} </span>
      <span className="Album">{album} </span>
    </div>
  );
}
