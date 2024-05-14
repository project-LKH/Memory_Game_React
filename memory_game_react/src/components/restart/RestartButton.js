import { initialStyle, restartButtonStyle } from "../../style/style_objects";
import { Button } from "@mui/material";

export default function RestartButton({
  setTiles,
  generateNew,
  matched,
  activeTile,
  setSuccess,
  setToggleVisibility,
  toggleVisibility,
  restartText,
  setRestartText,
  flippedTilesArr,
}) {
  const restart = () => {
    matched.current = [];
    activeTile.current = null;
    flippedTilesArr.forEach((arr) => {
      arr[0](initialStyle);
      arr[1](null);
      arr[2](false);
    });
    setToggleVisibility({
      ...restartButtonStyle,
      display: "none",
    });
    setRestartText("Restart");
    setTiles(generateNew(matched, activeTile, setSuccess, setToggleVisibility));
    setSuccess("None");
  };

  return (
    <Button
      variant="elevated"
      data-testid="restart"
      sx={toggleVisibility}
      onClick={restart}
    >
      {restartText}
    </Button>
  );
}
