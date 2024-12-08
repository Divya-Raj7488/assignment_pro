"use client";
import React, { useEffect, useRef, useState } from "react";
import "../styles/rain.css";

function RainDropAnimation() {
  const animationRef = useRef([]);
  const [currentDiv, setCurrentDiv] = useState(1);
  const dropSize = [1, 2, 3, 4, 5];
  const column = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "15",
  ];
  const row = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "15",
    "20",
  ];

  useEffect(() => {
    if (animationRef.length === 0) return;
    const timeoutIds = [];

    let intervalId = setInterval(() => {
      const { color1, color2 } = selectColor();
      let elements = [];
      let length = Math.floor(Math.random() * 10) + 5;

      for (let i = 0; i < length; i++) {
        let elementId = Math.floor(Math.random() * 15);
        elements.push(elementId);
      }
      elements.forEach((id) => {
        let startTime = Math.floor(Math.random() * 5000);

        if (animationRef.current[id] !== undefined) {
          const timeoutId = setTimeout(() => {
            animationRef.current[
              id
            ].style.backgroundImage = `linear-gradient(${color1}, ${color2})`;
            animationRef.current[id].classList.add("addDrop");
          }, startTime);
          timeoutIds.push(timeoutId);
        } 
      });
    }, 2000);
    return () => {
      clearInterval(intervalId);
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  function selectColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color1 = `rgb(${r}, ${g}, ${b}, 0.9)`;
    let color2 = `rgb(${r}, ${g}, ${b}, 1)`;
    return { color1, color2 };
  }

  return (
    <div className="rainDropAnimationContainer">
      <div className="rainContainer">
        {row.map((idx) => {
          return (
            <div className="dropsBox" key={idx}>
              {column.map((index) => {
                return <div key={index} className="dropBg"></div>;
              })}
              <div
                className="drop"
                ref={(element) => {
                  animationRef.current[idx] = element;
                }}
              ></div>
              ;
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RainDropAnimation;
