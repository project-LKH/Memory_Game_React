import { fireEvent, render, screen } from "@testing-library/react";
import RestartButton from "./RestartButton";
import { initialStyle } from "../../style/style_objects";

test("clicking restart should update the Tiles using their setState methods", () => {
  const mockSetChar = jest.fn();
  const mockSetCurrentStyle = jest.fn();
  const mockSetClicked = jest.fn();

  render(
    <RestartButton
      flippedTilesArr={[[mockSetCurrentStyle, mockSetChar, mockSetClicked]]}
      matched={{ current: [] }}
      activeTile={{ current: [] }}
      setToggleVisibility={jest.fn()}
      setRestartText={jest.fn()}
      setTiles={jest.fn()}
      setSuccess={jest.fn()}
      generateNew={jest.fn()}
    />
  );

  fireEvent.click(screen.getByTestId("restart"));

  expect(mockSetChar).toHaveBeenCalledWith(null);
  expect(mockSetCurrentStyle).toHaveBeenCalledWith(initialStyle);
  expect(mockSetClicked).toHaveBeenCalledWith(false);
});

test("clicking restart should update the successModals display value", () => {
  const mockSetSuccess = jest.fn();
  render(
    <RestartButton
      flippedTilesArr={[[jest.fn(), jest.fn(), jest.fn()]]}
      matched={{ current: [] }}
      activeTile={{ current: [] }}
      setToggleVisibility={jest.fn()}
      setRestartText={jest.fn()}
      setTiles={jest.fn()}
      setSuccess={mockSetSuccess}
      generateNew={jest.fn()}
    />
  );

  fireEvent.click(screen.getByTestId("restart"));
  expect(mockSetSuccess).toHaveBeenCalledWith("None");
});
