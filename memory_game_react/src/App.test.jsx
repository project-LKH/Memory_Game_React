import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/mockStore";
import { resetAllTiles } from "./redux/tile/slice";
import { resetState } from "./redux/board/slice";

describe("App", () => {
  let AppComponent;
  beforeAll(() => {
    AppComponent = (
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(() => {
    act(() => {
      store.dispatch(resetAllTiles());
      store.dispatch(resetState());
    });
  });

  test("should render with a board, title, timer and difficulty selector", () => {
    render(AppComponent);

    expect(screen.getByTestId("board")).toBeInTheDocument();
    expect(screen.getByTestId("title").textContent).toBe("Memory Game");
    expect(screen.getByTestId("timer")).toBeInTheDocument();
    expect(screen.getByTestId("grid-selector")).toBeInTheDocument();
  });

  test("should adjust the number of tiles based on difficulty", () => {
    render(AppComponent);

    expect(screen.getAllByTestId(/^[0-9]+[A-Z]$/).length).toBe(12);
    const options = screen.getAllByTestId(/^option-[0-2]$/);

    expect(screen.getByTestId("grid-size").value).toBe("1");

    expect(options[1].selected).toBeTruthy();
    expect(options[1].textContent).toBe("Morty");

    fireEvent.change(screen.getByTestId("grid-size"), {
      target: { value: 0 },
    });

    expect(options[0].selected).toBeTruthy();
    expect(options[0].textContent).toBe("Jerry");
    expect(screen.getAllByTestId(/^[0-9]+[A-Z]$/).length).toBe(6);

    fireEvent.change(screen.getByTestId("grid-size"), {
      target: { value: 2 },
    });

    expect(options[2].selected).toBeTruthy();
    expect(options[2].textContent).toBe("RICK");
    expect(screen.getAllByTestId(/^[0-9]+[A-Z]$/).length).toBe(20);
  });

  test("should render the current flip count", () => {
    render(AppComponent);
    const flipCounter = screen.getByTestId("flip-count");

    expect(flipCounter.textContent).toBe("flips: 0");

    const [card1, card2] = screen.getAllByTestId(/^[0-9]+A$/);

    fireEvent.click(card1);

    expect(flipCounter.textContent).toBe("flips: 1");

    fireEvent.click(card2);

    expect(flipCounter.textContent).toBe("flips: 2");
  });

  test("should start the timer when a card is clicked", () => {
    jest.useFakeTimers();
    render(AppComponent);
    const timer = screen.getByTestId("timer");

    expect(timer.textContent).toBe("00:00:00");

    const [card1] = screen.getAllByTestId(/^[0-9]+A$/);

    store.clearActions();
    fireEvent.click(card1);

    expect(store.getAction(2)).toEqual({
      type: "timerSlice/startTimer",
      payload: undefined,
    });

    act(() => jest.runAllTimers());
    expect(timer.textContent).not.toBe("00:00:00");
  });

  test("should reset the current flip count and timer when the restart button is clicked", () => {
    render(AppComponent);
    const flipCounter = screen.getByTestId("flip-count");

    screen.getAllByTestId(/^[0-9]+A$/).forEach((card) => fireEvent.click(card));

    expect(flipCounter.textContent).toBe("flips: 2");

    fireEvent.click(screen.getByTestId("restart"));

    expect(flipCounter.textContent).toBe("flips: 0");
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });
});
