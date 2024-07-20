import { easyGrid, hardGrid, mediumGrid } from "../../style/styleObjects";
import reducer, { adjustGridSize, initialState } from "./slice";

describe("grid slice", () => {
  describe("reducer", () => {
    test("should return the initial state", () => {
      expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });
  });

  describe("adjustGrid", () => {
    test("should set the correct gridSize for the given input", () => {  
      expect(reducer(initialState, adjustGridSize(0))).toEqual({
        ...initialState,
        gridSize: easyGrid,
      });

      expect(reducer(initialState, adjustGridSize(1))).toEqual({
        ...initialState,
        gridSize: mediumGrid,
      });

      expect(reducer(initialState, adjustGridSize(2))).toEqual({
        ...initialState,
        gridSize: hardGrid,
      });
    });
  });
});
