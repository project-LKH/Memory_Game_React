import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./board/slice";
import tileReducer from "./tile/slice";
import gridReducer from "./grid/slice";
import timerReducer from "./timer/slice";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    boardReducer,
    tileReducer,
    gridReducer,
    timerReducer,
  },
});

export const callActionForEach = (listOfPayLoads, signalBrainTo, doAction) =>
  listOfPayLoads.forEach((payload) => {
    signalBrainTo(doAction(payload));
  });
