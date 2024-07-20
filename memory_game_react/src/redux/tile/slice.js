import { createSlice } from "@reduxjs/toolkit";
import {
  clickedStyle,
  initialStyle,
  matchingStyle,
} from "../../style/styleObjects";

export const initialState = {
  matching: [],
  current: null,
  flipCount: 0,
  activeTiles: 0,
  tileSetUp: {
    style: { ...initialStyle },
    char: "",
    active: false,
  },
};

const tileSlice = createSlice({
  name: "tileSlice",
  initialState,
  reducers: {
    initializeStyle: (state, { payload }) => {
      state[payload] = { ...state.tileSetUp };
      state.activeTiles = 0;
    },

    setClickedStyle: (state, { payload }) => {
      state[payload] = {
        style: { ...clickedStyle },
        char: payload.match(/[a-z]/i)[0],
        active: true,
      };
      state.activeTiles += 1;
      state.flipCount += 1;
    },

    setCurrentActiveTile: (state, { payload }) => {
      state.current = payload;
    },

    setMatchingStyle: (state, { payload }) => {
      state[payload].style = { ...matchingStyle };
      state.matching.push(payload[payload.length - 1]);
      state.activeTiles = 0;
    },

    resetAllTiles: (state) => {
      const initialKeys = Object.keys(initialState);

      Object.keys(state).forEach((key) => {
        if (initialKeys.includes(key)) state[key] = initialState[key];
        else state[key] = { ...state.tileSetUp };
      });
    },
  },
});

export const {
  setCurrentActiveTile,
  setMatchingStyle,
  initializeStyle,
  setClickedStyle,
  resetAllTiles,
} = tileSlice.actions;

export default tileSlice.reducer;
