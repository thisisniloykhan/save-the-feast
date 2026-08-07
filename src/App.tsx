import { useState } from "react";

import { foods } from "./foods";
import { getRandomWord } from "./utils";

import Header from "./components/Header";
import ConfettiContainer from "./components/ConfettiContainer";
import GameStatus from "./components/GameStatus";
import FoodChips from "./components/FoodChips";
import WordLetters from "./components/WordLetters";
import Keyboard from "./components/Keyboard";
import AriaLiveStatus from "./components/AriaLiveStatus";
import NewGameButton from "./components/NewGameButton";

function App() {
  // state values

  const [currentWord, setCurrentWord] = useState<string>((): string =>
    getRandomWord(),
  );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [isGameShown, setIsGameShown] = useState<boolean>(false);

  //derived values
  const wrongGuessCount: number = guessedLetters.filter(
    (letter: string): boolean => !currentWord.includes(letter),
  ).length;
  const numGuessLeft: number = foods.length - wrongGuessCount;

  const isGameWon: boolean = [...currentWord].every((letter: string): boolean =>
    guessedLetters.includes(letter),
  );
  const isGameLost: boolean = wrongGuessCount >= foods.length;
  const isGameOver: boolean = isGameWon || isGameLost;
  const lastGuessedLetter: string | undefined =
    guessedLetters[guessedLetters.length - 1];

  const isLastGuessIncorrect: boolean | undefined = lastGuessedLetter
    ? !currentWord.includes(lastGuessedLetter)
    : undefined;

  //elements

  //functions

  function showGame(): void {
    setIsGameShown(true);
  }

  function handleLetterGuess(letter: string): void {
    setGuessedLetters((prevGuessedLetters: string[]): string[] =>
      prevGuessedLetters.includes(letter)
        ? prevGuessedLetters
        : [...prevGuessedLetters, letter],
    );
  }

  function resetGame(): void {
    setGuessedLetters([]);
    setCurrentWord(getRandomWord());
  }

  //statuscontent logic

  return (
    <>
      <main>
        {!isGameShown ? (
          <Header showGame={showGame} />
        ) : (
          <div className="game">
            <GameStatus
              wrongGuessCount={wrongGuessCount}
              isLastGuessIncorrect={isLastGuessIncorrect}
              isGameOver={isGameOver}
              isGameWon={isGameWon}
              isGameLost={isGameLost}
            />

            <FoodChips wrongGuessCount={wrongGuessCount} />

            <WordLetters
              currentWord={currentWord}
              guessedLetters={guessedLetters}
              isGameOver={isGameOver}
            />

            {/* combined visually hidden aria live region for status updates */}
            <AriaLiveStatus
              currentWord={currentWord}
              guessedLetters={guessedLetters}
              lastGuessedLetter={lastGuessedLetter}
              numGuessLeft={numGuessLeft}
              isGameOver={isGameOver}
            />

            <Keyboard
              currentWord={currentWord}
              guessedLetters={guessedLetters}
              handleLetterGuess={handleLetterGuess}
              isGameOver={isGameOver}
            />

            <NewGameButton isGameOver={isGameOver} resetGame={resetGame} />

            <ConfettiContainer isGameWon={isGameWon} />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
