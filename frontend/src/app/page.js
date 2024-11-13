"use client";
import "./styles/homepage.css";
import Nav from "./components/nav";
import "./styles/homepage.css";
import VerticalNav from "./components/verticalNav";
import { BottomNav } from "./components/verticalNav";
import CurrentPlayingCard from "./components/currentSong";
import { useState } from "react";
import QueueCard from "./components/queueCard";

export default function Home() {
  // const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(null);
  const songs = [
    { key: 1, name: "DIVYA" },
    { key: 2, name: "DIVYA" },
    { key: 3, name: "DIVYA" },
    { key: 4, name: "DIVYA" },
    { key: 5, name: "DIVYA" },
    { key: 6, name: "DIVYA" },
    { key: 7, name: "DIVYA" },
    { key: 8, name: "DIVYA" },
    { key: 9, name: "DIVYA" },
    { key: 10, name: "DIVYA" },
    { key: 11, name: "DIVYA" },
    { key: 12, name: "DIVYA" },
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
              songs.map(({ key, name }) => {
                return (
                  <div
                    style={{ width: "100%", height: "3rem" }}
                    onClick={() => {
                      setIsPlaying(key);
                    }}
                    key={key}
                  >
                    <QueueCard isPlaying={isPlaying}  keys={key} />
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
