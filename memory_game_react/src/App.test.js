import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("it should render with a board and title", () => {
  render(<App />);
  expect(screen.getByTestId("board")).toBeInTheDocument();
  expect(screen.getByTestId("title").textContent).toBe("Memory Game");
});

test("Clicking all matching tiles should display the successModal and update the restart text", () => {
  jest.useFakeTimers();
  render(<App />);
  const restartButton = screen.getByTestId("restart");
  const successElement = screen.getByTestId("successModal");

  expect(successElement).toBeInTheDocument();
  expect(successElement).toHaveStyle("display:none");

  expect(restartButton).toBeInTheDocument();
  expect(restartButton.textContent).toBe("Restart");
  expect(restartButton).toHaveStyle("display:none");

  ["A", "B", "C", "D", "E", "F"].forEach((letter) => {
    const reg = new RegExp(`[0-1]${letter}`);
    const matchingTiles = screen.getAllByTestId(reg);

    fireEvent.click(matchingTiles[0]);

    expect(restartButton).toHaveStyle("display:inline-flex");

    fireEvent.click(matchingTiles[1]);

    act(() => {
      jest.runAllTimers();
    });
  });

  expect(successElement).toHaveStyle("display:block");
  expect(restartButton.textContent).toBe("New Game");
});
