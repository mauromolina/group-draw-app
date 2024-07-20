import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

const PlayersList = ({ players, onRemovePlayer, refresh, needUpdate }) => {
  const handleRefreshList = () => {
    refresh();
  };
  return (
    <div className="bg-muted p-4 rounded-md flex flex-col items-center gap-2">
      {players.length === 0 && (
        <p className="text-center">Aún no hay jugadores</p>
      )}
      {players.map((player, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between py-2 w-full"
        >
          <span>{player}</span>
          <Button
            onClick={() => onRemovePlayer(idx)}
            className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
          >
            Eliminar
          </Button>
        </div>
      ))}
      {needUpdate && (
        <Button className="bg-green-500 mt-2" onClick={handleRefreshList}>
          <RefreshCcw className="mr-2" /> Actualizar listado
        </Button>
      )}
    </div>
  );
};

export default PlayersList;
