import clsx from "clsx";
import { foods } from "../foods";
import type { JSX } from "react";
import type { Food } from "../foods";

function FoodChips({ wrongGuessCount }: { wrongGuessCount: number }) {
  const foodElements: JSX.Element[] = foods.map(
    (food: Food, i: number): JSX.Element => {
      const isLost: boolean = i < wrongGuessCount;
      const styles: Omit<Food, "name"> = {
        backgroundColor: food.backgroundColor,
        color: food.color,
      };
      const className: string = clsx("food", isLost && "lost");
      return (
        <div key={food.name} className={className} style={styles}>
          {food.name}
        </div>
      );
    },
  );
  return <section className="foods-section">{foodElements}</section>;
}

export default FoodChips;
