import type { JSX } from "react";

type NewGameButtonProps = {
  isGameOver: boolean;
  resetGame: () => void;
};

export default function NewGameButton({
  isGameOver,
  resetGame,
}: NewGameButtonProps): JSX.Element {
  return (
    <>
      {isGameOver ? (
        <button className="new-game" onClick={resetGame}>
          New Game
        </button>
      ) : null}
    </>
  );
}
