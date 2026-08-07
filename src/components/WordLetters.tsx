import type { JSX } from "react";
import clsx from "clsx";

type WordLettersProps = {
  currentWord: string;
  guessedLetters: string[];
  isGameOver: boolean;
};

export default function WordLetters({
  currentWord,
  guessedLetters,
  isGameOver,
}: WordLettersProps): JSX.Element {
  const letterElements: JSX.Element[] = [...currentWord].map(
    (letter: string, i: number): JSX.Element =>
      isGameOver ? (
        <span
          className={clsx("letter", {
            wrong: !guessedLetters.includes(letter),
            right: guessedLetters.includes(letter),
          })}
          key={i}
        >
          {letter.toUpperCase()}
        </span>
      ) : (
        <span className="letter" key={i}>
          {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
        </span>
      ),
  );
  return <section className="word-section">{letterElements}</section>;
}
