import type { JSX } from "react";
import clsx from "clsx";
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

type KeyboardProps = {
  currentWord: string;
  guessedLetters: string[];
  handleLetterGuess: (letter: string) => void;
  isGameOver: boolean;
};

export default function Keyboard({
  currentWord,
  guessedLetters,
  handleLetterGuess,
  isGameOver,
}: KeyboardProps): JSX.Element {
  const keyboardElements: JSX.Element[] = [...ALPHABET].map(
    (letter: string): JSX.Element => {
      const isCorrect: boolean = currentWord.includes(letter);
      const isGuessed: boolean = guessedLetters.includes(letter);

      return (
        <button
          onClick={(): void => handleLetterGuess(letter)}
          className={clsx("keyboard-btn", {
            correct: isGuessed && isCorrect,
            incorrect: isGuessed && !isCorrect,
          })}
          disabled={isGameOver || isGuessed}
          aria-label={`Letter ${letter.toUpperCase()}`}
          key={letter}
        >
          {letter.toUpperCase()}
        </button>
      );
    },
  );
  return <section className="keyboard-section">{keyboardElements}</section>;
}
