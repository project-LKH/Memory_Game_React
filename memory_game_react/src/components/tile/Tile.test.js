import { Tile } from "./Tile";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const tileId = "0A";
const initialStyle = {
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
};
const clickedStyle = {
  boxShadow: "inset 21px 21px 51px #183e55,inset -21px -21px 51px #265e81",
  cursor: "auto",
};
const matchingStyle = {
  boxShadow: "inset 20px 20px 60px #2bd98e,inset -20px -20px 60px #3bffc0",
  background: "rgba(27, 72, 33, 0.75)",
};

test("Tiles style should update when clicked", () => {
  render(
    <Tile
      char={tileId[1]}
      index={0}
      current={{ current: [] }}
      matched={{ current: [] }}
      setSuccess={null}
      testId={tileId}
    />
  );
  expect(screen.getByTestId(tileId)).toHaveStyle(initialStyle);

  fireEvent.click(screen.getByTestId(tileId));

  expect(screen.getByTestId(tileId)).toHaveStyle(clickedStyle);
});

test("When matching Tiles are clicked their style should update", () => {
  jest.useFakeTimers();
  render(
    <Tile
      char={tileId[1]}
      index={0}
      current={{ current: [0, tileId[1], jest.fn(), jest.fn(), jest.fn()] }}
      matched={{ current: [] }}
      setSuccess={null}
      testId={tileId}
    />
  );

  expect(screen.getByTestId(tileId)).toHaveStyle(initialStyle);

  fireEvent.click(screen.getByTestId(tileId));

  expect(screen.getByTestId(tileId)).toHaveStyle(clickedStyle);

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByTestId(tileId)).toHaveStyle(matchingStyle);
});

test("When non-matching Tiles are clicked their style should revert to their initial style", () => {
  jest.useFakeTimers();
  render(
    <Tile
      char={tileId[1]}
      index={0}
      current={{ current: [0, "B", jest.fn(), jest.fn(), jest.fn()] }}
      matched={{ current: [] }}
      setSuccess={null}
      testId={tileId}
    />
  );

  expect(screen.getByTestId(tileId)).toHaveStyle(initialStyle);

  fireEvent.click(screen.getByTestId(tileId));

  expect(screen.getByTestId(tileId)).toHaveStyle(clickedStyle);

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByTestId(tileId)).toHaveStyle(initialStyle);
});
