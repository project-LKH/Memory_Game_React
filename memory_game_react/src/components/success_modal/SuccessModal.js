import { useEffect } from "react";
import { successModalStyle } from "../../style/style_objects";

export default function SuccessModal({ displayState, setRestartText }) {
  useEffect(() => {
    if (displayState === "block") setRestartText("New Game");
  }, [displayState, setRestartText]);
  return (
    <div style={successModalStyle(displayState)} data-testid={"successModal"}>
      {" "}
      Congratulations! You win! Click New Game to play again{" "}
    </div>
  );
}
