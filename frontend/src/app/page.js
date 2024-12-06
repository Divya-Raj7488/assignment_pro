"use client";
import "./styles/homepage.css";
import Nav from "./components/nav";
import "./styles/homepage.css";
import VerticalNav from "./components/verticalNav";
import { BottomNav } from "./components/verticalNav";
import CurrentPlayingCard from "./components/currentSong";
import { useEffect, useRef, useState } from "react";
import QueueCard from "./components/queueCard";
import { Howl } from "howler";
import Image from "next/image";
import micheal from "../../public/Michael.svg";

export default function Home() {
  const [currentSongId, setCurrentSongId] = useState(null);
  const [howl, setHowl] = useState(null);
  const [dragIdx, setDragIdx] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const howlRef = useRef(null);
  const durationRef = useRef(null);
  const songs = [
    {
      id: 0,
      songName: "care-enough",
      album: "lorem",
      singer: "Ln",
      songSrc: "./music/music1.mp3",
      duration: 178,
    },
    {
      id: 1,
      songName: "Host",
      album: "epsum",
      singer: "xyz",
      songSrc: "./music/music2.mp3",
      duration: 159,
    },

    {
      id: 2,
      songName: "party",
      album: "dollar",
      singer: "rdz",
      songSrc: "/music/music4.mp3",
      duration: 31,
    },

    {
      id: 3,
      songName: "Olivia",
      album: "dollar",
      singer: "rdz",
      songSrc: "/music/music5.mp3",
      duration: 162,
    },
    {
      id: 4,
      songName: "Sad story",
      album: "dollar",
      singer: "rdz",
      songSrc: "/music/music6.mp3",
      duration: 146,
    },
    {
      id: 5,
      songName: "random",
      album: "dollar",
      singer: "rdz",
      songSrc: "/music/music3.mp3",
      duration: 222,
    },
  ];
  const [components, setComponents] = useState(songs);
  const [currentDuration, setCurrentDuration] = useState(0);

  function clearDurationRef() {
    clearInterval(durationRef.current);
    durationRef.current = null;
  }

  useEffect(() => {
    if (!howl) return;
    if (durationRef.current) clearInterval(durationRef.current);
    let id = setInterval(() => {
      if (howl.seek() === howl._duration) {
        clearInterval(id);
      } else {
        setCurrentDuration(() => Math.floor(howl.seek()));
      }
    }, 1000);
    durationRef.current = id;
  }, [howl]);

  // play song

  const playSong = (id) => {
    if (howlRef.current !== null) {
      howlRef.current.stop();
      howlRef.current.unload();
      howlRef.current = null;
    }

    setCurrentSongId(id);
    const newHowl = new Howl({
      src: [components[id].songSrc],
      loop: false,
      onend: () => {
        if (id < components.length - 1) {
          playSong(id + 1);
        } else {
          console.log("Playlist completed");
          if (howlRef.current !== null) {
            howlRef.current.stop();
            howlRef.current.unload();
            howlRef.current = null;
          }
          if (durationRef.current !== null) {
            clearDurationRef();
          }
          setCurrentSongId(null);
          setIsPlaying(false);
        }
      },
    });
    howlRef.current = newHowl;
    newHowl.play();
    setHowl(newHowl);
    setIsPlaying(true);

    if (durationRef.current !== null) {
      clearDurationRef();
    }
    setCurrentDuration(0);
    console.log("playing again");
  };

  // control - functions

  const controlFlow = {
    pauseSong: function() {
      if (howl) {
        howl.pause();
        setIsPlaying(false);
      }
    },
    resumeSong: function() {
      if (howl !== null) {
        howl.play();
        setIsPlaying(true);
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
      if (currentSongId !== null && currentSongId < components.length - 1) {
        playSong(currentSongId + 1);
      } else if (
        currentSongId !== null &&
        currentSongId === components.length - 1
      ) {
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
  // Drag-Drop controller
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
    if (dragIdx < currentSongId && id >= currentSongId) {
      setCurrentSongId((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
      });
    } else if (dragIdx > currentSongId && id <= currentSongId) {
      setCurrentSongId((prev) => {
        if (prev < components.length) {
          return prev + 1;
        }
      });
    } else if (dragIdx === currentSongId) {
      setCurrentSongId(() => {
        return id;
      });
    }
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
            <div className="artistData">
              <div className="artistBackground">
                <div className="personalInfo"></div>
                <Image
                  src={micheal}
                  alt="Micheal Jackson"
                  className="artistImage"
                />
              </div>
            </div>
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
                        playSong(index);
                      }}
                      key={index}
                    >
                      <QueueCard
                        currentSongId={currentSongId}
                        songs={song}
                        idx={index}
                      />
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
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentDuration={currentDuration}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
