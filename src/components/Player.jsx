import { ArrowLeft, CircleX, Pencil, Save, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";

const Player = ({
  name,
  id,
  currentPlayer,
  resetPlayer,
  deletePlayer,
  updatePlayer,
  playerGroup,
  groups,
}) => {
  const [currentPlayerGroup, setCurrentPlayerGroup] = useState(playerGroup);
  const [isShaking, setIsShaking] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  useEffect(() => {
    if (currentPlayer === null) return;
    if (currentPlayer && currentPlayer.id === id) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
        resetPlayer();
      }, 4000);
      return () => {
        setIsShaking(false);
        setPlayerName(name);
        clearTimeout(timer);
      };
    }
  }, [currentPlayer]);

  return (
    <>
      <div
        className={`p-2 m-1 border rounded-md text-center font-semibold flex items-center justify-between ${
          isShaking ? "shakePlayer border-4 border-black" : ""
        }`}
        style={{ backgroundColor: "lightblue", color: "black" }}
      >
        <span className="flex-grow text-center">{name}</span>
        <AlertDialog>
          <AlertDialogTrigger>
            <Pencil
              className="ml-auto mr-4"
              size={20}
              color="green"
              strokeWidth={1.5}
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center mb-2">
                Editar participante
              </AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <label className="font-semibold text-black">Grupo</label>
                <div className="flex items-center justify-between gap-4 mt-2">
                  {groups.map((group) => (
                    <Button
                      key={group.name}
                      type="button"
                      onClick={() => setCurrentPlayerGroup(group.name)}
                      className={`w-full ${
                        group.name === currentPlayerGroup
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-transparent text-black hover:bg-gray-200 border-solid border border-gray-300"
                      }  py-2 rounded-md`}
                    >
                      {group.name}
                    </Button>
                  ))}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="bg-red-500 hover:bg-red-700 hover:text-white text-white"
                onClick={() => {
                  setPlayerName(name);
                  setCurrentPlayerGroup(playerGroup);
                }}
              >
                <ArrowLeft
                  size={20}
                  color="white"
                  strokeWidth={1.5}
                  className="mr-2"
                />
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-green-600 hover:bg-green-700"
                onClick={() => updatePlayer(id, playerName, currentPlayerGroup)}
              >
                <Save
                  size={20}
                  color="white"
                  strokeWidth={1.5}
                  className="mr-2"
                />{" "}
                Guardar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger>
            <CircleX
              className="ml-auto"
              size={20}
              color="red"
              strokeWidth={1.5}
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Tas seguro de eliminar este player? 😰
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-green-500 text-white">
                <ArrowLeft
                  size={20}
                  color="white"
                  strokeWidth={1.5}
                  className="mr-2"
                />
                Nono
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600"
                onClick={() => deletePlayer(id)}
              >
                <Trash2
                  size={20}
                  color="white"
                  strokeWidth={1.5}
                  className="mr-2"
                />{" "}
                Si, que se vaya
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Player;
