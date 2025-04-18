import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff4081", "#3f51b5", "#4caf50", "#ffc107"];

    // Spray paint effect function
    const spray = (x, y) => {
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 15;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, 1.5, 0, 2 * Math.PI);
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fill();
      }
    };

    let interval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      spray(x, y);
    }, 400); // Slower graffiti effect

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Graffiti Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />

      {/* Success Message */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold drop-shadow-xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        >
          Order Placed Successfully!
        </motion.h1>
      </div>
    </div>
  );
}
