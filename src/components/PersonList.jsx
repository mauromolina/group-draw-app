import React from "react";

const PersonList = ({ people, onRemovePerson }) => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-medium mb-2">
        People List ({people.length})
      </h2>
      <ul className="list-disc list-inside">
        {people.map((person, idx) => (
          <li key={idx} className="flex justify-between items-center">
            {person}
            <button
              onClick={() => onRemovePerson(idx)}
              className="ml-2 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
