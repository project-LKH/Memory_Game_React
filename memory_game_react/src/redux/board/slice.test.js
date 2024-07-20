import { restartButtonStyle } from "../../style/styleObjects";
import reducer, {
  initialState,
  setRestartButton,
  resetState,
  endGame,
  shuffleTiles,
  setCharSetSize,
} from "./slice";

describe("board slice", () => {
  describe("reducer", () => {
    test("should return the initial state", () => {
      expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });
  });

  describe("setRestartButton", () => {
    test("should set the restart style  display value to block", () => {
      expect(reducer(initialState, setRestartButton())).toEqual({
        ...initialState,
        gameStarted: true,
        restartStyle: {
          ...restartButtonStyle,
          display: "block",
        },
      });
    });
  });

  describe("setCharSetSize", () => {
    test("should set the charSetSize", () => {
      [3, 6, 10].forEach((setSize, index) => {
        expect(reducer(initialState, setCharSetSize(index))).toEqual({
          ...initialState,
          charSetSize: setSize,
        });
      });
    });
  });

  describe("shuffleTiles", () => {
    let updatedState;

    beforeAll(() => {
      updatedState = reducer(initialState, shuffleTiles());
    });

    test("should set rendered to true", () => {
      expect(updatedState.rendered).toBe(true);
    });

    test("should set charsUsed to an array of mixed letters and set chars", () => {
      expect(updatedState.charsUsed).not.toEqual(initialState.charsUsed);
    });

    test("should set charSize to charsUsed.length", () => {
      expect(updatedState.charSize).toBe(updatedState.charsUsed.length);
    });
  });

  describe("endGame", () => {
    let updatedState;

    beforeAll(() => {
      updatedState = reducer(initialState, endGame());
    });

    test("should set the restart text value to new game", () => {
      expect(updatedState.restartText).toBe("New Game");
    });

    test("should set the successDisplay to grid", () => {
      expect(updatedState.successDisplay).toBe("grid");
    });
  });

  describe("resetState", () => {
    test("should reset the current state to its initial value", () => {
      expect(
        reducer(
          { ...initialState, restartText: "wrong text", charsSelected: ["G"] },
          resetState()
        )
      ).toEqual(initialState);
    });
  });
});
