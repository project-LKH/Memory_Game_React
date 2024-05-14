import { render, screen } from "@testing-library/react";
import TileGrid from "./TileGrid";

test("should render with 12 Tiles", () => {
  render(<TileGrid />);
  expect(screen.getAllByTestId(/\d[A-F]/).length).toBe(12);
});
