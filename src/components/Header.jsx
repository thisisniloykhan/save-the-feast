import { foods } from "../foods";

export default function Header(props) {
  return (
    <header>
      <h1>Save the Feast</h1>
      <p>
        Guess the word in under {foods.length} wrong attempts before the entire
        feast disappears!
      </p>
      <button onClick={props.showGame} className="start-btn">
        Start Game
      </button>
    </header>
  );
}
