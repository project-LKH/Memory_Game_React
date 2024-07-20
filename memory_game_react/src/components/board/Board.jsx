import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Tile } from "../tile/Tile.jsx";
import { boardStyle, successModalStyle } from "../../style/styleObjects";
import { resetState, shuffleTiles } from "../../redux/board/slice";
import { initializeStyle, resetAllTiles } from "../../redux/tile/slice";
import { callActionForEach } from "../../redux/store";
import { resetTimer } from "../../redux/timer/slice";

export default function Board() {
  const signalBrainTo = useDispatch();

  const { gridSize } = useSelector((state) => state.gridReducer);
  const { successDisplay, restartStyle, restartText, rendered, charsUsed } =
    useSelector((state) => state.boardReducer);
  const { flipCount } = useSelector((state) => state.tileReducer);
  const { time } = useSelector((state) => state.timerReducer) || {};

  useEffect(() => {
    if (!rendered) signalBrainTo(shuffleTiles());

    callActionForEach(
      charsUsed.map((char, index) => index + char),
      signalBrainTo,
      initializeStyle
    );
  }, [signalBrainTo, charsUsed, rendered, gridSize]);

  const restart = () => {
    signalBrainTo(resetTimer());
    signalBrainTo(resetAllTiles());
    signalBrainTo(resetState());
  };

  return (
    <div style={boardStyle} data-testid={"board"}>
      <div style={gridSize}>
        {charsUsed.map((char, index) =>
          [index + char].map((id) => {
            return <Tile key={id} id={id} testId={id} />;
          })
        )}
      </div>
      <Button
      id="restart"
        variant="elevated"
        data-testid="restart"
        sx={restartStyle}
        onClick={restart}
      >
        {restartText}
      </Button>
      <div
        id="success_modal"
        style={successModalStyle(successDisplay)}
        data-testid={"successModal"}
      >
        <div id="rick">
          <div id="rick-text">
            <p style={{ color: "white" }}>Time: {time}</p>
            <p>Oh... You won... </p>
            <p>well this is awkward</p>
            <p>try a new game</p>
            <p style={{ color: "white" }}>Total flips: {flipCount}</p>
          </div>
          <div id="rick-img">.</div>
        </div>
      </div>
    </div>
  );
}
