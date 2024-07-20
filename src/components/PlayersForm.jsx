import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const PlayersForm = ({ addPlayer, players }) => {
  const [player, setPlayer] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (player.trim() === "") return;
    addPlayer(player);
    setPlayer("");
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-center">
        Participantes ({players.length})
      </h2>
      <form className="flex justify-between gap-2" onSubmit={handleFormSubmit}>
        <Input
          type="text"
          onChange={(e) => setPlayer(e.target.value)}
          value={player}
        />
        <Button> Agregar </Button>
      </form>
    </>
  );
};

export default PlayersForm;
