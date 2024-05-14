import { render, screen } from "@testing-library/react";
import SuccessModal from "./SuccessModal";

const displayStates = {
  block: "block",
  none: "none",
};

const successId = "successModal";

test("should have a display of none when rendered", () => {
  render(
    <SuccessModal
      displayState={displayStates.none}
      setRestartText={jest.fn()}
    />
  );
  expect(screen.getByTestId(successId)).toHaveStyle({
    display: displayStates.none,
  });
});

test("should update the restart text using its setState method when display is updated to block", () => {
  const mockSetStateMethod = jest.fn();
  render(
    <SuccessModal
      displayState={displayStates.block}
      setRestartText={mockSetStateMethod}
    />
  );
  expect(mockSetStateMethod).toHaveBeenCalledWith("New Game");
});

test("The success modal should display the correct message", () => {
  render(
    <SuccessModal
      displayState={displayStates.block}
      setRestartText={jest.fn()}
    />
  );
  expect(screen.getByTestId(successId).textContent).toBe(
    " Congratulations! You win! Click New Game to play again "
  );
});

test("The success modal should have the correct style when display is set to block", () => {
  render(
    <SuccessModal
      displayState={displayStates.block}
      setRestartText={jest.fn()}
    />
  );
  expect(screen.getByTestId(successId)).toHaveStyle({
    display: displayStates.block,
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.4em",
    backgroundColor: "teal",
    color: "white",
    gridRow: 4,
    gridColumn: "1/-1",
    textAlign: "center",
  });
});
