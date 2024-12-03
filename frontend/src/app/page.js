"use client";
import "./styles/homepage.css";
import Nav from "./components/nav";
import "./styles/homepage.css";
import VerticalNav from "./components/verticalNav";
import { BottomNav } from "./components/verticalNav";
import CurrentPlayingCard from "./components/currentSong";
import { useState } from "react";
import QueueCard from "./components/queueCard";
import { Howl } from "howler";

export default function Home() {
  const [currentSongId, setCurrentSongId] = useState(null);
  const [howl, setHowl] = useState(null);
  const [dragIdx, setDragIdx] = useState(null);
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
  const [components, setComponents] = useState(songs);

  const playSong = (id) => {
    if (howl !== null) {
      howl.stop();
      howl.unload();
    }
    const newHowl = new Howl({
      src: [components[id].songSrc],
      loop: true,
      onend: () => {
        if (currentSongId < components.length - 1) {
          playSong(currentSongId + 1);
        } else {
          console.log("playlist completed");
        }
      },
    });
    newHowl.play();
    setHowl(newHowl);
    setCurrentSongId(id);
  };
  const controlFlow = {
    pauseSong: function() {
      if (howl !== null) {
        howl.pause();
      }
    },
    resumeSong: function() {
      if (howl !== null) {
        howl.play();
      }
    },
    PlayPrevious: function() {
      if (currentSongId !== null && currentSongId > 0) {
        playSong(currentSongId - 1);
      } else if (currentSongId !== null && currentSongId == 0) {
        console.log("no previous song");
        playSong(currentSongId);
      } else {
        console.log("cannot load previous song");
      }
    },
    playNext: function() {
      if (currentSongId !== null && currentSongId < songs.length - 1) {
        playSong(currentSongId + 1);
      } else if (currentSongId !== null && currentSongId === songs.length - 1) {
        console.log("no next song");
        playSong(0);
      } else {
        console.log("cannot load previous song");
      }
    },
    repeatSong: function() {
      if (currentSongId !== null) {
        playSong(currentSongId);
      }
    },
    randomSong: function() {
      const newId = Math.floor(Math.random() * (songs.length - 1));
      playSong(newId);
    },
  };

  function handleDragStart(id) {
    setDragIdx(id);
  }

  function handleDragEnd(e) {
    e.preventDefault();
  }
  function handleDrop(id) {
    const updatedComponents = [...components];
    const [draggedItem] = updatedComponents.splice(dragIdx, 1);
    updatedComponents.splice(id, 0, draggedItem);
    console.log(id)
    setCurrentSongId(id);
    setComponents(updatedComponents);
    setDragIdx(null);
  }

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
        <div className="hey">
          <div className="songList">
            <div className="artistData"></div>
            <div className="songData">
              {components &&
                components.map((song, index) => {
                  return (
                    <div
                      draggable
                      onDragStart={() => {
                        handleDragStart(index);
                      }}
                      onDragOver={(e) => {
                        handleDragEnd(e);
                      }}
                      onDrop={() => {
                        handleDrop(index);
                      }}
                      style={{ width: "100%", height: "3rem" }}
                      onClick={() => {
                        setCurrentSongId(index);
                        playSong(index);
                      }}
                      key={index}
                    >
                      <QueueCard currentSongId={currentSongId} songs={song} idx = {index} />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="currentPlaying">
            {currentSongId !== null && (
              <CurrentPlayingCard
                song={components[currentSongId]}
                currentSongId={currentSongId}
                controlFlow={controlFlow}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
