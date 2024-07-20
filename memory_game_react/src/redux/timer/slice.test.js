import reducer, {
  initialState,
  resetTimer,
  startTimer,
  tick,
  stopTimer,
} from "./slice";

describe("timerSlice", () => {
  describe("reducer", () => {
    test("should return the initial state", () => {
      expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });
  });

  describe("startTimer", () => {
    test("should set started to true", () => {
      expect(reducer(initialState, startTimer())).toEqual({
        ...initialState,
        started: true,
      });
    });
  });

  describe("stopTimer", () => {
    test("should set started to false", () => {
      expect(
        reducer(
          {
            ...initialState,
            started: true,
          },
          stopTimer()
        )
      ).toEqual({
        ...initialState,
        started: false,
      });
    });
  });

  describe("tick", () => {
    test("should increment sec by one and set the new time", () => {
      expect(reducer(initialState, tick())).toEqual({
        ...initialState,
        sec: 1,
        time: "00:00:01",
      });
    });

    test("should increment min by one if sec is greater than 59 and set the new time", () => {
      expect(reducer({ ...initialState, sec: 59 }, tick())).toEqual({
        ...initialState,
        sec: 0,
        min: 1,
        time: "00:01:00",
      });
    });

    test("should increment hr by one if min is greater than 59 and set the new time", () => {
      expect(reducer({ ...initialState, sec: 59, min: 59 }, tick())).toEqual({
        ...initialState,
        sec: 0,
        min: 0,
        hr: 1,
        time: "01:00:00",
      });
    });
  });

  describe("resetTimer", () => {
    test("should reset the state", () => {
      expect(
        reducer(
          { sec: 1, min: 0, hr: 1, started: true, time: "01:00:01" },
          resetTimer()
        )
      ).toEqual(initialState);
    });
  });
});
