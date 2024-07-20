import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";

const Player = ({ name, id, currentPlayer }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "player",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (currentPlayer && currentPlayer.id === id) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 4000); // Shake duration
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, id]);

  return (
    <div
      ref={drag}
      className={`p-2 m-1 border rounded-md ${
        isDragging ? "opacity-50" : "opacity-100"
      } ${isShaking ? "shakePlayer border-4 border-black" : ""}`}
      style={{ backgroundColor: "lightblue", cursor: "grab", color: "black" }}
    >
      {name}
    </div>
  );
};

export default Player;
