import { useMemo } from "react";
import type { JSX } from "react";
import clsx from "clsx";
import { foods } from "../foods";
import { getFarewellText } from "../utils";

type GameStatusProps = {
  isLastGuessIncorrect: boolean | undefined;
  wrongGuessCount: number;
  isGameOver: boolean;
  isGameWon: boolean;
  isGameLost: boolean;
};

function GameStatus({
  isLastGuessIncorrect,
  wrongGuessCount,
  isGameOver,
  isGameWon,
  isGameLost,
}: GameStatusProps): JSX.Element {
  // useMemo

  const farewellMessage: string | null = useMemo((): string | null => {
    if (!isLastGuessIncorrect) return null;

    const lostFood = foods[wrongGuessCount - 1];
    if (!lostFood) return null;

    return getFarewellText(lostFood.name);
  }, [isLastGuessIncorrect, wrongGuessCount]);

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

  const statusSectionClassName: string = clsx("status-section", {
    won: isGameWon,
    lost: isGameLost,
  });

  return (
    <section
      aria-live="polite"
      role="status"
      className={statusSectionClassName}
    >
      {statusContent}
    </section>
  );
}

export default GameStatus;
