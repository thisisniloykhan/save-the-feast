import { words } from "./words";

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

export function getFarewellText(item) {
  const options = [
    `Oh no! The ${item} is gone! 😭`,
    `No more ${item} for the feast!`,
    `${item} just disappeared!`,
    `The ${item} won't make it to the table.`,
    `There goes the ${item}!`,
    `${item} has been eaten already! 😋`,
    `The ${item} is off the menu!`,
    `You lost the ${item}!`,
    `Someone grabbed the ${item} first!`,
    `The feast lost its ${item}.`,
    `The feast won't be the same without ${item}.`,
    `Too late! The ${item} is gone.`,
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}