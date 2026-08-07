import { foods } from "../foods";
import type { JSX } from "react";

export default function Header({
  showGame,
}: {
  showGame: () => void;
}): JSX.Element {
  return (
    <header>
      <h1>Save the Feast</h1>
      <p>
        Guess the word in under {foods.length} wrong attempts before the entire
        feast disappears!
      </p>
      <button onClick={showGame} className="start-btn">
        Start Game
      </button>
    </header>
  );
}
