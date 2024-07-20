import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tick } from "../../redux/timer/slice";

export default function Timer() {
  const signalBrainTo = useDispatch();
  const { time, started } = useSelector((state) => state.timerReducer);

  useEffect(() => {
    if (started)
      setTimeout(() => {
        signalBrainTo(tick());
      }, 1000);
  }, [signalBrainTo, time, started]);

  return (
    <p data-testid="timer" className="center-content">
      {started ? time : "00:00:00"}
    </p>
  );
}
