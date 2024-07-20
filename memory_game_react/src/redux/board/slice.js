import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  rendered: false,
  gameStarted: false,
  chars: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  charSetSizeOptions: [3, 6, 10],
  charSize: 12,
  charsSelected: [],
  charsUsed: [],
  charSetSize: 6,
  restartStyle: {
    display: "none",
  },
  restartText: "Restart",
  successDisplay: "none",
};

const boardSlice = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {
    shuffleTiles: (state) => {
      const temp = [...state.chars].slice(0, state.charSetSize);
      state.charsSelected = temp;
      state.rendered = true;
      state.charsUsed = [...temp, ...temp].sort(() => Math.random() - 0.5);
      state.charSize = state.charsUsed.length;
    },

    setRestartButton: (state) => {
      state.restartStyle.display = "block";
      state.gameStarted = true;
    },

    endGame: (state) => {
      state.restartText = "New Game";
      state.successDisplay = "grid";
    },

    resetState: (state) => {
      Object.keys(state).forEach((key) => {
        if (key === "charSetSize") return;
        state[key] = initialState[key];
      });
    },

    setCharSetSize: (state, { payload }) => {
      state.charSetSize = state.charSetSizeOptions[payload];
    },
  },
});

export const {
  setRestartButton,
  resetState,
  endGame,
  shuffleTiles,
  setCharSetSize,
} = boardSlice.actions;

export default boardSlice.reducer;
