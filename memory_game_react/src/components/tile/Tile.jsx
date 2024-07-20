import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callActionForEach } from "../../redux/store";
import {
  initializeStyle,
  setClickedStyle,
  setCurrentActiveTile,
  setMatchingStyle,
} from "../../redux/tile/slice";
import { endGame, setRestartButton } from "../../redux/board/slice";
import { startTimer, stopTimer } from "../../redux/timer/slice";

export const changeStyleArr = [];

export function Tile({ id, testId }) {
  const signalBrainTo = useDispatch();

  const { activeTiles, matching, current } = useSelector(
    (state) => state.tileReducer
  );
  const { charSize } = useSelector((state) => state.boardReducer);
  const { active, style, char } =
    useSelector((state) => state.tileReducer[id]) || {};

  useEffect(() => {
    if (matching.length === 0 && current) {
      signalBrainTo(startTimer());
      signalBrainTo(setRestartButton());
    }

    if (matching.length === charSize) {
      setTimeout(() => {
        signalBrainTo(stopTimer());
        signalBrainTo(endGame());
      });
      return;
    }
  }, [matching, signalBrainTo, current, charSize]);

  const updateStyle = () => {
    if (active || activeTiles >= 2) return;

    if (!matching.includes(id[0])) signalBrainTo(setClickedStyle(id));

    if (!current) return signalBrainTo(setCurrentActiveTile(id));

    if (id !== current && id[id.length - 1] === current[current.length - 1]) {
      callActionForEach([id, current], signalBrainTo, setMatchingStyle);
      signalBrainTo(setCurrentActiveTile(null));
      return;
    }

    if (!matching.includes(char)) {
      setTimeout(() => {
        callActionForEach([id, current], signalBrainTo, initializeStyle);
        signalBrainTo(setCurrentActiveTile(null));
      }, 300);
      return;
    }
  };

  return (
    <div id="tile" data-testid={testId} style={style} onClick={updateStyle}>
      {char}
    </div>
  );
}
