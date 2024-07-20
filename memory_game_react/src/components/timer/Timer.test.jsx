import { act, render, screen } from "@testing-library/react";
import Timer from "./Timer";
import { Provider } from "react-redux";
import store from "../../redux/mockStore";
import { startTimer, stopTimer } from "../../redux/timer/slice";

describe("Timer", () => {
  let TimerComponent;
  beforeAll(() => {
    TimerComponent = (
      <Provider store={store}>
        <Timer />
      </Provider>
    );
  });

  describe("initial render", () => {
    test("should display the correct start time", () => {
      render(TimerComponent);
      expect(screen.getByTestId("timer").textContent).toBe("00:00:00");
    });
  });

  describe("activated", () => {
    beforeEach(() => {
      act(() => {
        store.dispatch(startTimer());
        store.clearActions();
      });
    });

    afterEach(() => {
      act(() => {
        store.dispatch(stopTimer());
      });
    });

    test("should dispatch the correct action", () => {
      jest.useFakeTimers();
      render(TimerComponent);

      act(() => {
        jest.runAllTimers();
      });

      expect(store.getAction(0)).toEqual({
        payload: undefined,
        type: "timerSlice/tick",
      });
    });

    test("should display the correct time", () => {
      jest.useFakeTimers();
      render(TimerComponent);

      act(() => {
        jest.runAllTimers();
      });

      expect(screen.getByTestId("timer").textContent).toBe(
        store.getState().timerReducer.time
      );
      expect(screen.getByTestId("timer").textContent).not.toBe("00:00:00");
    });
  });
});
