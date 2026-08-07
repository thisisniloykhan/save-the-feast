import type { JSX } from "react/jsx-runtime";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function ConfettiContainer({
  isGameWon,
}: {
  isGameWon: boolean;
}): JSX.Element {
  const { width, height } = useWindowSize();
  return (
    <>
      {isGameWon && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={1000}
        />
      )}
    </>
  );
}
