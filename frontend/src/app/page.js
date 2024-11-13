"use client";
import "./styles/homepage.css";
import Nav from "./components/nav";
import "./styles/homepage.css";
import VerticalNav from "./components/verticalNav";
import { BottomNav } from "./components/verticalNav";
import CurrentPlayingCard from "./components/currentSong";
import { useState } from "react";
import QueueCard from "./components/queueCard";
// import { Howl, Howler } from "howler";

export default function Home() {
  // const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(null);
  const songs = [
    {
      key: 1,
      songName: "care-enough",
      album: "lorem",
      singer: "ln",
      songSrc: "./music/music1.mp3",
    },
    {
      key: 2,
      songName: "Host",
      album: "epsum",
      singer: "xyz",
      songSrc: "./music/music2.mp3",
    },
    {
      key: 3,
      songName: "random",
      album: "dollar",
      singer: "rdz",
      songSrc: "/music/music2.mp3",
    },
  ];
 
  return (
    <main className="homepage">
      <nav className="nav">
        <Nav />
      </nav>
      <div className="pageData">
        <div className="verticalNav">
          <VerticalNav />
          <BottomNav />
        </div>
        <div className="songList">
          <div className="artistData"></div>
          <div className="songData">
            {songs &&
              songs.map(({ key }) => {
                return (
                  <div
                    style={{ width: "100%", height: "3rem" }}
                    onClick={() => {
                      setIsPlaying(key);
                    }}
                    key={key}
                  >
                    <QueueCard isPlaying={isPlaying} songs={songs} />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="currentPlaying">
          <CurrentPlayingCard />
        </div>
      </div>
    </main>
  );
}
