import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { divideIntoGroups } from "./utils/groups";
import "./index.css";
import PlayersForm from "./components/PlayersForm";
import PlayersList from "./components/PlayersList";
import GroupsForm from "./components/GroupsForm";
import Groups from "./components/Groups";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";

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

  const [needUpdate, setNeedUpdate] = useState(false);

  const handleAddPerson = (person) => {
    setPeople([...people, person]);
  };

  const handleRemovePerson = (index) => {
    setPeople(people.filter((_, idx) => idx !== index));
  };

  const handleSortGroups = (group) => {
    if (people.length > 0) {
      const newGroups = divideIntoGroups(people, group);
      setGroups(
        newGroups.map((group, index) => ({
          name: `Grupo ${index + 1}`,
          color: `hsl(${index * 60}, 70%, 70%)`,
          people: { ...group },
          score: 0,
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
    setGroups((prev) => {
      const updatedGroups = prev.map((g) => {
        if (g.name === group) {
          return {
            ...g,
            score: g.score + points,
          };
        }
        return g;
      });
      return updatedGroups;
    });
  };

  const refreshList = () => {
    // Get people from people state that are not stored in groups state
    setNeedUpdate(false);
    const newPeople = people.filter(
      (person) =>
        !Object.values(groupedPlayers).some((group) =>
          group.some((player) => player.name === person)
        )
    );

    // Distribute new people among existing groups
    const updatedGroups = { ...groupedPlayers };
    newPeople.forEach((person, index) => {
      const groupIndex = index % Object.keys(updatedGroups).length;
      const groupName = Object.keys(updatedGroups)[groupIndex];
      updatedGroups[groupName].push({ id: uuidv4(), name: person });
    });

    // Update the state with the new groups
    setGroupedPlayers(updatedGroups);

    // Optionally, update the groups state if needed
    setGroups((prevGroups) =>
      prevGroups.map((group) => ({
        ...group,
        people: updatedGroups[group.name],
      }))
    );
  };

  const resetData = () => {
    localStorage.clear();
    setPeople([]);
    setGroups([]);
    setGroupedPlayers({});
    setScores({});
    setNeedUpdate(false);
  };

  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem("players", JSON.stringify(people));
      localStorage.setItem("groups", JSON.stringify(groups));
      localStorage.setItem("groupedPlayers", JSON.stringify(groupedPlayers));
      localStorage.setItem("scores", JSON.stringify(scores));
    }
  }, [groups, people, groupedPlayers, scores]);

  const sortedGroups = groups.sort((a, b) => b.score - a.score);

  useEffect(() => {
    const newPeople = people.filter(
      (person) =>
        !Object.values(groupedPlayers).some((group) =>
          group.some((player) => player.name === person)
        )
    );
    if (newPeople.length > 0 && groups.length > 0) {
      setNeedUpdate(true);
    }
  }, [people]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        <main className="flex-1 p-8 grid-cols-2 flex flex-col gap-8">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex flex-col gap-2">
              <PlayersForm addPlayer={handleAddPerson} players={people} />
              <PlayersList
                players={people}
                onRemovePlayer={handleRemovePerson}
                refresh={refreshList}
                needUpdate={needUpdate}
              />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg drop-shadow-sm">
            <GroupsForm sort={handleSortGroups} reset={resetData} />
          </div>
          {groups && groups.length > 0 && (
            <div className="bg-card p-6 rounded-lg shadow-lg drop-shadow-sm">
              <Groups
                groups={sortedGroups}
                movePlayer={movePlayer}
                onAddPoints={handleAddPoints}
              />
            </div>
          )}
        </main>
        <Footer />
      </div>
    </DndProvider>
  );
};

export default App;
