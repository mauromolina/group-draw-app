import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { ArrowLeft, CircleAlert, Dices, Trash2 } from "lucide-react";
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

const GroupsForm = ({ sort, reset }) => {
  const [numGroups, setNumGroups] = useState(2);

  const handleGroupsChange = (e) => {
    setNumGroups(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sort(numGroups);
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-center">Grupos</h2>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between flex-col gap-4"
        >
          <div className="flex items-center justify-center w-full gap-8">
            <label htmlFor="groups" className="text-sm font-medium">
              Cantidad de grupos
            </label>
            <Input
              type="number"
              id="groups"
              value={numGroups}
              onChange={handleGroupsChange}
              className="w-24 text-center"
              min="2"
              max="10"
            />
          </div>
          <Button className="w-full">
            <Dices size={20} color="white" strokeWidth={1.5} className="mr-2" />{" "}
            Generar equipos
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button type="button" className="bg-red-600">
                <CircleAlert
                  size={20}
                  color="white"
                  strokeWidth={1.5}
                  className="mr-2"
                />{" "}
                Limpiar todos los datos
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  El texto es claro, pero me veo obligado a avisarte que si
                  aceptas, vas a borrar todos los datos cargados 😰
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
                  No, que miedo
                </AlertDialogCancel>
                <AlertDialogAction className="bg-red-600" onClick={reset}>
                  <Trash2
                    size={20}
                    color="white"
                    strokeWidth={1.5}
                    className="mr-2"
                  />{" "}
                  Si, eliminar todo
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </div>
    </>
  );
};

export default GroupsForm;
