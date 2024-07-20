import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const GroupsForm = ({ sort }) => {
  const [numGroups, setNumGroups] = useState(2);

  const handleGroupsChange = (value) => {
    setNumGroups(parseInt(value));
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
          <div className="flex items-center justify-between w-full">
            <label htmlFor="groups" className="text-sm font-medium">
              Cantidad de grupos
            </label>
            <Select
              id="groups"
              value={numGroups}
              onValueChange={handleGroupsChange}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5, 6, 7, 8].map((numGroups) => (
                  <SelectItem key={numGroups} value={numGroups}>
                    {numGroups}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full">Generar equipos</Button>
        </form>
      </div>
    </>
  );
};

export default GroupsForm;
