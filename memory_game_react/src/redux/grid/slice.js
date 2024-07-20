import { createSlice } from "@reduxjs/toolkit";
import { easyGrid, hardGrid, mediumGrid } from "../../style/styleObjects";
export const initialState = {
  gridSize: mediumGrid,
  options: [easyGrid, mediumGrid, hardGrid],
};

const gridSlice = createSlice({
  name: "gridSlice",
  initialState,
  reducers: {
    adjustGridSize: (state, { payload }) => {
      state.gridSize = state.options[payload];
    },
  },
});

export const { adjustGridSize } = gridSlice.actions;
export default gridSlice.reducer;
