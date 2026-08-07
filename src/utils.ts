import { words } from "./words";

function getRandomIndex<T>(arr: T[]): number {
  return Math.floor(Math.random() * arr.length);
}

export function getRandomWord(): string {
  return words[getRandomIndex<string>(words)];
}

export function getFarewellText(item: string): string {
  const options: string[] = [
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

  return options[getRandomIndex<string>(options)];
}
