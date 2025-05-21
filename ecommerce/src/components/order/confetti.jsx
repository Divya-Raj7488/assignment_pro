import React from "react";

const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 100 }).map((_, index) => {
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 3;
        const size = Math.floor(Math.random() * 8) + 6;
        const colors = [
          "#FF5252",
          "#FFD740",
          "#64FFDA",
          "#448AFF",
          "#E040FB",
          "#69F0AE",
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <div
            key={index}
            className="absolute animate-confetti-fall"
            style={{
              left: `${left}%`,
              top: "-20px",
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? "50%" : "0",
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${animationDelay}s`,
              animationDuration: `${Math.random() * 3 + 5}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Confetti;
