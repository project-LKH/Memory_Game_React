import { useDispatch } from "react-redux";
import { resetAllTiles } from "../../redux/tile/slice";
import { resetState, setCharSetSize } from "../../redux/board/slice";
import { adjustGridSize } from "../../redux/grid/slice";
import { resetTimer } from "../../redux/timer/slice";

export default function DifficultySelector() {
  const signalBrainTo = useDispatch();

  const adjustGridAndResetState = () => {
    const selector = document.getElementById("grid-size");
    const currentValue = selector.options[selector.selectedIndex].value;
    [
      [adjustGridSize, currentValue],
      [resetAllTiles],
      [resetState],
      [setCharSetSize, currentValue],
      [resetTimer],
    ].forEach(([action, payload]) => signalBrainTo(action(payload)));
  };

  return (
    <div
      id="grid-selector"
      data-testid="grid-selector"
      className="center-content"
      style={{
        display: "flex",
        placeContent: "center",
      }}
    >
      <p id="difficulty">Difficulty: </p>
      <select
        name="grid-size"
        id="grid-size"
        data-testid="grid-size"
        onChange={adjustGridAndResetState}
        style={{
          height: "fit-content",
          placeSelf: "center",
          backgroundColor: "transparent",
          color: "black",
        }}
        defaultValue={1}
      >
        {["Jerry", "Morty", "RICK"].map((difficulty, index) => (
          <option
            data-testid={"option-" + index}
            key={difficulty}
            value={index}
            style={{
              color: "black",
              height: "10%",
              justifySelf: "center",
              fontFamily: "'Permanent Marker', cursive",
              fontStyle: "normal",
              textDecoration: "wavy",
              textShadow: "0px 0px 8px #00ffe5ea",
            }}
          >
            {difficulty}
          </option>
        ))}
      </select>
    </div>
  );
}
