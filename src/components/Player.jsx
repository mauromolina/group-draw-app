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
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "player",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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
        clearTimeout(timer);
      };
    }
  }, [currentPlayer]);

  return (
    <>
      <div
        ref={drag}
        className={`p-2 m-1 border rounded-md text-center font-semibold flex items-center justify-between ${
          isDragging ? "opacity-50" : "opacity-100"
        } ${isShaking ? "shakePlayer border-4 border-black" : ""}`}
        style={{ backgroundColor: "lightblue", cursor: "grab", color: "black" }}
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
              <AlertDialogTitle>Editar participante</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                className="bg-green-600"
                onClick={() => updatePlayer(id, playerName)}
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
