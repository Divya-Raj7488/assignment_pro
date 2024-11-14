"use client";
import "./styles/homepage.css";
import Nav from "./components/nav";
import "./styles/homepage.css";
import VerticalNav from "./components/verticalNav";
import { BottomNav } from "./components/verticalNav";
import CurrentPlayingCard from "./components/currentSong";
import { useState } from "react";
import QueueCard from "./components/queueCard";
import { Howl, Howler } from "howler";

export default function Home() {
  const [currentSongId, setCurrentSongId] = useState(null);
  const songs = [
    {
      id: 0,
      songName: "care-enough",
      album: "lorem",
      singer: "Ln",
      songSrc: "./music/music1.mp3",
    },
    {
      id: 1,
      songName: "Host",
      album: "epsum",
      singer: "xyz",
      songSrc: "./music/music2.mp3",
    },
    {
      id: 2,
      songName: "random",
      album: "dollar",
      singer: "rdz",
      songSrc: "/music/music3.mp3",
    },
  ];

  const playSong = (id) => {
    const howl = new Howl({
      src: [songs[id].songSrc],
      onend: () => {
        setIsPlaying(false);
      },
    });

    howl.play();
  };
  const pauseSong = () => {
    if (currentSongId !== null) {
      songs[currentSongId].howl.pause();
    }
  };
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
              songs.map((song) => {
                return (
                  <div
                    style={{ width: "100%", height: "3rem" }}
                    onClick={() => {
                      setCurrentSongId(song.id);
                      playSong(song.id);
                    }}
                    key={song.id}
                  >
                    <QueueCard isPlaying={currentSongId} songs={song} />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="currentPlaying">
          {currentSongId !== null && (
            <CurrentPlayingCard
              song={songs[currentSongId]}
              isPlaying={currentSongId}
              pauseSong={pauseSong}
            />
          )}
        </div>
      </div>
    </main>
  );
}
