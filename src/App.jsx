import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GroupForm from "./components/GroupForm";
import PersonList from "./components/PersonList";
import GroupDisplay from "./components/GroupDisplay";
import GroupTurn from "./components/GroupTurn";
import { divideIntoGroups } from "./utils/groups";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import "./index.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import PlayersForm from "./components/PlayersForm";
import PlayersList from "./components/PlayersList";
import GroupsForm from "./components/GroupsForm";
import Groups from "./components/Groups";

const App = () => {
  // get people from local storage or set it to an empty array
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem("players")) || []
  );
  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("groups")) || []
  );
  const [groupedPlayers, setGroupedPlayers] = useState(
    JSON.parse(localStorage.getItem("groupedPlayers")) || {}
  );
  const [scores, setScores] = useState(
    JSON.parse(localStorage.getItem("scores")) || {}
  );

  const handleAddPerson = (person) => {
    setPeople([...people, person]);
  };

  const handleRemovePerson = (index) => {
    setPeople(people.filter((_, idx) => idx !== index));
  };

  const handleSortGroups = (group) => {
    if (people.length > 0) {
      const numGroups = Math.ceil(people.length / group); // Example logic for number of groups
      const newGroups = divideIntoGroups(people, numGroups);
      setGroups(
        newGroups.map((group, index) => ({
          name: `Grupo ${index + 1}`,
          color: `hsl(${index * 60}, 70%, 70%)`,
          people: { ...group },
        }))
      );
      const playersByGroup = newGroups.reduce((acc, group, idx) => {
        acc[`Grupo ${idx + 1}`] = group;
        return acc;
      }, {});
      setGroupedPlayers(playersByGroup);

      const scoresByGroup = newGroups.reduce((acc, group, idx) => {
        acc[`Grupo ${idx + 1}`] = 0;
        return acc;
      }, {});
      setScores(scoresByGroup);
    }
  };

  const movePlayer = (playerId, targetGroupIdx) => {
    console.log("move");
    const targetGroupName = `Grupo ${targetGroupIdx + 1}`;
    const sourceGroupName = Object.keys(groupedPlayers).find((groupName) =>
      groupedPlayers[groupName].some((player) => player.id === playerId)
    );

    if (sourceGroupName !== targetGroupName) {
      const playerToMove = groupedPlayers[sourceGroupName].find(
        (player) => player.id === playerId
      );
      setGroupedPlayers((prev) => ({
        ...prev,
        [sourceGroupName]: prev[sourceGroupName].filter(
          (player) => player.id !== playerId
        ),
        [targetGroupName]: [...prev[targetGroupName], playerToMove],
      }));
      setGroups((prev) => {
        const updatedGroups = prev.map((group) => {
          console.log({ group, playerToMove, data: { ...group.people } });
          if (group.name === sourceGroupName) {
            return {
              ...group,
              people: Object.values(group.people).filter(
                (player) => player.id !== playerId
              ),
            };
          }
          if (group.name === targetGroupName) {
            return {
              ...group,
              people: {
                ...group.people,
                [Object.keys(group.people).length]: playerToMove,
              },
            };
          }
          return group;
        });
        return updatedGroups;
      });
    }
  };

  const handleAddPoints = (group, points) => {
    console.log({ group, points, type: typeof points });
    setScores((prev) => ({
      ...prev,
      [group]: parseInt(prev[group] + points),
    }));
  };

  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem("players", JSON.stringify(people));
      localStorage.setItem("groups", JSON.stringify(groups));
      localStorage.setItem("groupedPlayers", JSON.stringify(groupedPlayers));
      localStorage.setItem("scores", JSON.stringify(scores));
    }
  }, [groups, people, groupedPlayers, scores]);

  return (
    <DndProvider backend={HTML5Backend}>
      {/* <div>
        <h1 className="text-center text-2xl font-bold my-4">Group Draw App</h1>
        <GroupForm
          onAddPerson={handleAddPerson}
          onSortGroups={handleSortGroups}
          people={people}
        />
        <PersonList people={people} onRemovePerson={handleRemovePerson} />
        <GroupDisplay
          groups={groups}
          players={groupedPlayers}
          movePlayer={movePlayer}
          scores={scores}
          onAddPoints={handleAddPoints}
        />
        <GroupTurn groups={groups} />
      </div> */}

      {/* <div className="mt-4">
        <Button>Test</Button>
      </div> */}

      <div className="flex flex-col h-screen">
        <main className="flex-1 p-8 grid-cols-2 flex flex-col gap-8">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex flex-col gap-2">
              <PlayersForm addPlayer={handleAddPerson} />
              <PlayersList
                players={people}
                onRemovePlayer={handleRemovePerson}
              />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg drop-shadow-sm">
            <GroupsForm sort={handleSortGroups} />
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg drop-shadow-sm">
            <Groups
              groups={groups}
              movePlayer={movePlayer}
              onAddPoints={handleAddPoints}
              scores={scores}
            />
          </div>
        </main>
      </div>
    </DndProvider>
  );
};

export default App;
