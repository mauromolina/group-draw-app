import { v4 as uuidv4 } from "uuid";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const divideIntoGroups = (people, numGroups) => {
  // Shuffle the array of people
  const shuffledPeople = shuffleArray([...people]);

  // Create an array of empty groups
  const groups = Array.from({ length: numGroups }, () => []);

  // Distribute people into groups
  shuffledPeople.forEach((person, index) => {
    groups[index % numGroups].push({ id: uuidv4(), name: person });
  });

  return groups;
};

// Función para elegir aleatoriamente un grupo
export const getRandomGroup = (groups) => {
  const randomIndex = Math.floor(Math.random() * groups.length);
  return groups[randomIndex];
};

// Función para elegir aleatoriamente un jugador
export const getRandomPlayer = (group) => {
  console.log({ group });
  const randomIndex = Math.floor(
    Math.random() * Object.values(group.people).length
  );
  console.log({ randomIndex });
  return group.people[randomIndex];
};
