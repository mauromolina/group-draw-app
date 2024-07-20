import React, { useState } from "react";
import { Button } from "./ui/button";

const GroupForm = ({ onAddPerson, onSortGroups, people }) => {
  const [person, setPerson] = useState("");
  const [group, setGroup] = useState(2);

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (person.trim() === "") return;
    onAddPerson(person.trim());
    setPerson("");
  };

  const handleSortGroups = (e) => {
    e.preventDefault();
    onSortGroups(group);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form
        onSubmit={handleAddPerson}
        className="flex items-center mb-4 flex-col"
      >
        <div>
          <input
            type="text"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md"
            placeholder="Add a person"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div>
          <label htmlFor="">Cantidad de grupos</label>
          <input
            type="number"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md"
            placeholder="Cantidad de grupos"
          />
        </div>
      </form>
      <Button
        onClick={handleSortGroups}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
      >
        Sort Groups
      </Button>
    </div>
  );
};

export default GroupForm;
