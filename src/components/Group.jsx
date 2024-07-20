import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Player from "./Player";

const Group = ({ group, players, movePlayer, index, score, onAddPoints }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "player",
    drop: (item) => movePlayer(item.id, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [points, setPoints] = useState(0);

  const handleAddPoints = () => {
    onAddPoints(group.name, points);
    setPoints(0);
  };

  useEffect(() => {
    console.log("Players in group:", players);
  }, [players]);

  return (
    <div
      ref={drop}
      className={`p-4 m-2 border rounded-md ${
        isOver ? "bg-gray-200" : "bg-white"
      }`}
      style={{ minHeight: "150px", backgroundColor: group.color }}
    >
      <h3 className="font-bold text-black">
        {group.name} - Puntos:{score}
      </h3>
      {Object.values(players).map((player) => (
        <Player key={player.id} id={player.id} name={player.name} />
      ))}
      <div className="mt-2">
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          className="border p-1 rounded-md mr-2"
        />
        <button
          onClick={handleAddPoints}
          className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
        >
          Add Points
        </button>
      </div>
    </div>
  );
};

export default Group;
