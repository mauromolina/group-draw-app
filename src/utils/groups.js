import { v4 as uuidv4 } from "uuid";

// Función para dividir personas en grupos
export const divideIntoGroups = (people, numGroups) => {
  const groups = Array.from({ length: numGroups }, () => []);
  people.forEach((person, index) => {
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
