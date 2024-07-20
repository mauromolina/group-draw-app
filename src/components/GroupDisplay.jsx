import React from "react";
import Group from "./Group";

const GroupDisplay = ({ groups, players, movePlayer, scores, onAddPoints }) => {
  console.log({ groups, players, scores });
  return (
    <div className="flex justify-around">
      {groups.map((group, idx) => (
        <Group
          key={idx}
          index={idx}
          group={group}
          players={players[group.name]}
          movePlayer={movePlayer}
          score={scores[group.name]}
          onAddPoints={onAddPoints}
        />
      ))}
    </div>
  );
};

export default GroupDisplay;
