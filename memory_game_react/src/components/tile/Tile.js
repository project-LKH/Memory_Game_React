import { useState } from "react";
import {
  clickedStyle,
  matchingStyle,
  initialStyle,
  restartButtonStyle,
} from "../../style/style_objects";

export const changeStyleArr = [];

export function Tile({
  char,
  index,
  current,
  matched,
  setSuccess,
  testId,
  setToggleRestartButton,
}) {
  const [currentStyle, setCurrentStyle] = useState(initialStyle);
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState(null);

  changeStyleArr.push([setCurrentStyle, setText, setClicked]);

  const flipTile = (style, status, char) => {
    setCurrentStyle(style);
    setClicked(status);
    setText(char);
  };

  const updateStyle = () => {
    if (!matched.current.includes(char) && !clicked) {
      flipTile(clickedStyle, true, char);

      if (!current.current) {
        current.current = [index, char, setCurrentStyle, setText, setClicked];
        setSuccess("None");
        setToggleRestartButton(restartButtonStyle);
        return;
      }

      if (current.current[0] === index && char === current.current[1]) {
        matched.current = [...matched.current, char];

        setTimeout(() => {
          setCurrentStyle(matchingStyle);
          current.current[2](matchingStyle);
          current.current = null;
        }, 150);

        if (matched.current.length === 6) setSuccess("block");
        return;
      }

      if (current.current[1] !== char) {
        setTimeout(() => {
          if (current.current) {
            flipTile(initialStyle, false, null);

            current.current[2](initialStyle);
            current.current[3](null);
            current.current[4](false);
            current.current = null;
          } else {
            current.current = [
              index,
              char,
              setCurrentStyle,
              setText,
              setClicked,
            ];
          }
        }, 500);

        return;
      }
    }
  };

  return (
    <div data-testid={testId} style={currentStyle} onClick={updateStyle}>
      {text}
    </div>
  );
}
