import { useState, useMemo } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import clsx from "clsx";
import Header from "./components/Header";
import { foods } from "./foods";
import { getFarewellText, getRandomWord } from "./utils";
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function App() {
  // state values

  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [isGameShown, setIsGameShown] = useState(false);

  //derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;
  const numGuessLeft = foods.length - wrongGuessCount;

  const isGameWon = [...currentWord].every((letter) =>
    guessedLetters.includes(letter),
  );
  const isGameLost = wrongGuessCount >= foods.length;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const farewellMessage = useMemo(() => {
    if (!isLastGuessIncorrect) return null;

    const lostFood = foods[wrongGuessCount - 1];
    if (!lostFood) return null;

    return getFarewellText(lostFood.name);
  }, [isLastGuessIncorrect, wrongGuessCount]);

  // static values
  const { width, height } = useWindowSize();

  const foodElements = foods.map((food, i) => {
    const isLost = i < wrongGuessCount;
    return (
      <div
        key={food.name}
        className={clsx("food", isLost && "lost")}
        style={{
          backgroundColor: food.backgroundColor,
          color: food.color,
        }}
      >
        {food.name}
      </div>
    );
  });

  const letterElements = [...currentWord].map((letter, i) =>
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

  const keyboardElements = [...ALPHABET].map((letter) => {
    const isCorrect = currentWord.includes(letter);
    const isGuessed = guessedLetters.includes(letter);

    return (
      <button
        onClick={() => handleLetterGuess(letter)}
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
  });

  function showGame() {
    setIsGameShown(true);
  }

  function handleLetterGuess(letter) {
    setGuessedLetters((prevGuessedLetters) =>
      prevGuessedLetters.includes(letter)
        ? prevGuessedLetters
        : [...prevGuessedLetters, letter],
    );
  }

  function resetGame() {
    setGuessedLetters([]);
    setCurrentWord(getRandomWord());
  }

  let statusContent = null;
  if (isGameOver) {
    if (isGameWon) {
      statusContent = (
        <>
          <h3>Feast Saved!</h3>
          <p>You saved what's left of the feast. Enjoy your meal! 😋</p>
        </>
      );
    } else {
      statusContent = (
        <>
          <h3>Feast Ruined!</h3>
          <p>
            The feast is gone! Looks like you're staying hungry this time. 😭🍽️
          </p>
        </>
      );
    }
  } else if (farewellMessage) {
    statusContent = <p className="farewell-message">{farewellMessage}</p>;
  }

  const statusSectionClassName = clsx("status-section", {
    won: isGameWon,
    lost: isGameLost,
  });

  return (
    <>
      <main>
        {!isGameShown ? (
          <Header showGame={showGame} />
        ) : (
          <div className="game">
            <section
              aria-live="polite"
              role="status"
              className={statusSectionClassName}
            >
              {statusContent}
            </section>
            <section className="foods-section">{foodElements}</section>
            <section className="word-section">{letterElements}</section>
            {/* combined visually hidden aria live region for status updates */}
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
                  .map((letter) =>
                    guessedLetters.includes(letter) ? letter + "." : "blank.",
                  )
                  .join(" ")}
              </p>
            </section>
            <section className="keyboard-section">{keyboardElements}</section>
            {isGameOver ? (
              <button className="new-game" onClick={resetGame}>
                New Game
              </button>
            ) : null}
            {isGameWon && (
              <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={1000}
              />
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
