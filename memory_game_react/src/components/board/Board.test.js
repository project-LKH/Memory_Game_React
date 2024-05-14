import { render, screen } from "@testing-library/react";
import Board from "./Board";

test("The board should contain tiles", () => {
  render(<Board />);
  expect(screen.getAllByTestId(/^\d[A-Z]$/)[0]).toBeInTheDocument();
  expect(screen.getAllByTestId(/^\d[A-Z]$/).length).toBe(12);
});

test("The board should contain a restart Button", () => {
  render(<Board />);
  expect(screen.getAllByTestId("restart")[0]).toBeInTheDocument();
});

test("The board should contain a successModal", () => {
  render(<Board />);
  expect(screen.getAllByTestId("successModal")[0]).toBeInTheDocument();
});
