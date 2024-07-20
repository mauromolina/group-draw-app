import { useDrop } from "react-dnd";
import Player from "./Player";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getRandomPlayer } from "@/utils/groups";

const Group = ({
  group,
  movePlayer,
  index,
  onAddPoints,
  score,
  currentGroup,
  resetGroup,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "player",
    drop: (item) => movePlayer(item.id, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [addScore, setAddScore] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const handleAddPoints = () => {
    onAddPoints(group.name, parseInt(addScore));
    setAddScore(0);
  };

  const handleRandomPlayer = () => {
    setCurrentPlayer(null);
    if (currentGroup && !currentPlayer) {
      const randomPlayer = getRandomPlayer(currentGroup);
      console.log({ randomPlayer });
      setCurrentPlayer(randomPlayer);
    }
  };

  useEffect(() => {
    if (currentGroup === null) return;
    if (currentGroup && currentGroup.name === group.name) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
        resetGroup();
      }, 4000);
      return () => {
        setIsShaking(false);
        clearTimeout(timer);
      };
    }
  }, [currentGroup]);

  return (
    <div
      ref={drop}
      className={`bg-white p-4 rounded-lg shadow-md ${
        isShaking ? "shake border-4 border-red-500" : ""
      }`}
      style={{ minHeight: "150px", backgroundColor: group.color }}
    >
      <div className="flex justify-between gap-2">
        <h3 className="text-lg font-bold mb-2">{group.name}</h3>
        <h4 className="text-lg font-bold mb-2">{score} puntos</h4>
      </div>
      {Object.values(group.people).map((player) => (
        <Player
          key={player.id}
          id={player.id}
          name={player.name}
          currentPlayer={currentPlayer}
          resetPlayer={() => setCurrentPlayer(null)}
        />
      ))}
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="number"
          placeholder="Puntos"
          onChange={(e) => setAddScore(e.target.value)}
          value={addScore}
        />
        <Button
          className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
          onClick={handleAddPoints}
        >
          Agregar puntos
        </Button>
      </div>
      {currentGroup && currentGroup.name === group.name && (
        <Button
          onClick={handleRandomPlayer}
          type="button"
          className="w-full mt-2 bg-black"
        >
          Elegir 1 participante
        </Button>
      )}
    </div>
  );
};

export default Group;
