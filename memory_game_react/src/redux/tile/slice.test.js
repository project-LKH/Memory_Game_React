import { clickedStyle, matchingStyle } from "../../style/styleObjects";
import reducer, {
  setMatchingStyle,
  initializeStyle,
  setClickedStyle,
  resetAllTiles,
  initialState,
  setCurrentActiveTile,
} from "./slice";

describe("tile slice", () => {
  let id, char;

  beforeAll(() => {
    id = "0A";
    char = id[id.length - 1];
  });

  describe("reducer", () => {
    test("should return the initial state", () => {
      expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });
  });

  describe("initializeStyle", () => {
    test("should create a property in the state object to manage the tiles style", () => {
      expect(reducer(initialState, initializeStyle(id))).toEqual({
        ...initialState,
        [id]: initialState.tileSetUp,
      });
    });
  });

  describe("setCurrentActive", () => {
    test("should set the current active tile to the given input", () => {
      expect(reducer(initialState, setCurrentActiveTile(id))).toEqual({
        ...initialState,
        current: id,
      });
    });
  });

  describe("setClickedStyle", () => {
    test("should set the given ids style to clicked and and keep track of flips", () => {
      expect(
        reducer({ flipCount: 0, activeTiles: 0 }, setClickedStyle(id))
      ).toEqual({
        flipCount: initialState.flipCount + 1,
        activeTiles: initialState.activeTiles + 1,
        [id]: {
          style: { ...clickedStyle },
          char: char,
          active: true,
        },
      });
    });
  });

  describe("setMatchingStyle", () => {
    test("should set the given ids style to matched, update the matching array and reset activeTiles", () => {
      expect(
        reducer(
          { matching: [], [id]: { style: undefined } },
          setMatchingStyle(id)
        )
      ).toEqual({
        activeTiles: 0,
        matching: [char],
        [id]: {
          style: { ...matchingStyle },
        },
      });
    });
  });

  describe("resetAllTiles", () => {
    test("should revert all state properties to their initial state and tile properties to tileSetup", () => {
      expect(
        reducer(
          {
            ...initialState,
            activeTiles: 0,
            matching: [char],
            [id]: {
              style: { ...matchingStyle },
            },
          },
          resetAllTiles()
        )
      ).toEqual({ ...initialState, [id]: { ...initialState.tileSetUp } });
    });
  });
});
