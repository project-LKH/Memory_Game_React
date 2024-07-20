import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  hr: 0,
  min: 0,
  sec: 0,
  started: false,
  time: "00:00:00",
};
const timerSlice = createSlice({
  name: "timerSlice",
  initialState,
  reducers: {
    tick: (state) => {
      state.sec += 1;
      if (state.sec > 59) {
        state.sec = 0;
        state.min += 1;
      }

      if (state.min > 59) {
        state.min = 0;
        state.hr += 1;
      }
      state.time = [state.hr, state.min, state.sec]
        .map((num) => (num > 9 ? num.toString() : "0" + num))
        .join(":");
    },
    startTimer: (state) => {
      state.started = true;
    },
    stopTimer: (state) => {
      state.started = false;
    },
    resetTimer: (state) => {
      state.hr = 0;
      state.min = 0;
      state.sec = 0;
      state.started = false;
      state.time = "00:00:00";
    },
  },
});

export const { resetTimer, startTimer, tick, stopTimer } = timerSlice.actions;
export default timerSlice.reducer;
