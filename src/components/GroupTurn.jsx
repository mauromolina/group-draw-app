import React, { useEffect } from "react";
import { getRandomGroup, getRandomPlayer } from "../utils/groups";

const GroupTurn = ({ groups }) => {
  const [currentGroup, setCurrentGroup] = React.useState(null);
  const [currentPlayer, setCurrentPlayer] = React.useState(null);

  const handleRandomGroup = () => {
    console.log("Groups:", groups);
    const randomGroup = getRandomGroup(groups);
    console.log(randomGroup);
    setCurrentGroup(randomGroup);
  };

  const handleRandomPlayer = () => {
    if (currentGroup) {
      const randomPlayer = getRandomPlayer(currentGroup);
      setCurrentPlayer(randomPlayer);
    }
  };

  useEffect(() => {
    console.log("Current Group:", currentGroup);
  }, [currentGroup]);

  return (
    <div>
      <button onClick={handleRandomGroup}>Get Random Group</button>
      {currentGroup && (
        <div>
          <h3>Current Group: {currentGroup.name}</h3>
          <ul>
            {Object.values(currentGroup.people).map((person) => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul>
          <button onClick={handleRandomPlayer}>Get Random Player</button>
          {currentPlayer && <p>Current Player: {currentPlayer.name}</p>}
        </div>
      )}
    </div>
  );
};

export default GroupTurn;
