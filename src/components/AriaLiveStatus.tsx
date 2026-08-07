import type { JSX } from "react";

type AriaLiveStatusProps = {
  currentWord: string;
  guessedLetters: string[];
  lastGuessedLetter: string | undefined;
  numGuessLeft: number;
  isGameOver: boolean;
};

function AriaLiveStatus({
  currentWord,
  guessedLetters,
  lastGuessedLetter,
  numGuessLeft,
  isGameOver,
}: AriaLiveStatusProps): JSX.Element {
  return (
    <section className="sr-only" aria-live="polite" role="status">
      <p>
        {lastGuessedLetter &&
          (currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter.toUpperCase()} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter.toUpperCase()} is not in the word.`)}
        {!isGameOver ? ` You have ${numGuessLeft} attempts left` : ""}
      </p>
      <p>
        Current word:
        {[...currentWord]
          .map((letter: string): string =>
            guessedLetters.includes(letter) ? letter + "." : "blank.",
          )
          .join(" ")}
      </p>
    </section>
  );
}

export default AriaLiveStatus;
