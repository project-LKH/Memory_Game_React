import { useRef, useState } from "react";
import TileGrid from "../tile_grid/TileGrid";
import RestartButton from "../restart/RestartButton";
import SuccessModal from "../success_modal/SuccessModal";
import { boardStyle, restartButtonStyle } from "../../style/style_objects";
import { changeStyleArr } from "../tile/Tile";

export default function Board() {
  const matchedChars = useRef([]);
  const activeTile = useRef(null);
  const [success, setSuccess] = useState("none");
  const [toggleRestartButton, setToggleRestartButton] = useState({
    ...restartButtonStyle,
    display: "none",
  });
  const [restartText, setRestartText] = useState("Restart");
  const [tiles, setTiles] = useState(
    TileGrid(matchedChars, activeTile, setSuccess, setToggleRestartButton)
  );

  return (
    <div style={boardStyle} data-testid={"board"}>
      {tiles}
      <SuccessModal displayState={success} setRestartText={setRestartText} />
      <RestartButton
        setTiles={setTiles}
        generateNew={TileGrid}
        matched={matchedChars}
        activeTile={activeTile}
        setSuccess={setSuccess}
        setToggleVisibility={setToggleRestartButton}
        toggleVisibility={toggleRestartButton}
        restartText={restartText}
        setRestartText={setRestartText}
        flippedTilesArr={changeStyleArr}
      />
    </div>
  );
}
