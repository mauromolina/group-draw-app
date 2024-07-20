import { useEffect, useRef, useState } from "react";
import Group from "./GroupItem";
import { Button } from "./ui/button";
import { getRandomGroup } from "@/utils/groups";

const Groups = ({ groups, movePlayer, onAddPoints }) => {
  const [currentGroup, setCurrentGroup] = useState(null);

  const groupRefs = useRef([]);

  const handleRandomGroup = () => {
    const randomGroup = getRandomGroup(groups);
    setCurrentGroup(randomGroup);
  };

  useEffect(() => {
    if (currentGroup) {
      const groupIndex = groups.findIndex(
        (group) => group.name === currentGroup.name
      );
      if (groupIndex !== -1 && groupRefs.current[groupIndex]) {
        groupRefs.current[groupIndex].scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentGroup, groups]);

  return (
    <>
      <div className="flex items-center justify-center mb-2 flex-wrap gap-2 ">
        <Button onClick={handleRandomGroup}>Grupo al azar</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups?.map((group, index) => (
          <div key={index} ref={(el) => (groupRefs.current[index] = el)}>
            <Group
              group={group}
              index={index}
              movePlayer={movePlayer}
              onAddPoints={onAddPoints}
              score={group.score}
              currentGroup={currentGroup}
              resetGroup={() => setCurrentGroup(null)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Groups;
