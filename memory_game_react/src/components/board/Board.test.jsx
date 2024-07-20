import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Board from "./Board";
import store from "../../redux/mockStore";
import { resetState } from "../../redux/board/slice";
import { resetAllTiles } from "../../redux/tile/slice";

describe("Board", () => {
  let boardComponent, simulateWin;
  beforeEach(() => {
    boardComponent = (
      <Provider store={store}>
        <Board />
      </Provider>
    );
    act(() => {
      store.dispatch(resetState());
      store.dispatch(resetAllTiles());
    });
    simulateWin = () =>
      store.getState().boardReducer.charsSelected.forEach((char) => {
        const generatedTilePairId = new RegExp(`[0-9]+${char}`);
        screen.getAllByTestId(generatedTilePairId).forEach((tile) => {
          fireEvent.click(tile);
        });
      });
    store.clearActions();
  });

  describe("initial render", () => {
    test("should contain tiles", () => {
      render(boardComponent);

      expect(store.getAction(0)).toEqual({
        type: "boardSlice/shuffleTiles",
        payload: undefined,
      });

      expect(
        store
          .getAction("all")
          .filter((action) => action.type === "tileSlice/initializeStyle")
          .length
      ).toBe(store.getState().boardReducer.charSize);

      expect(screen.getAllByTestId(/^[0-9]+[A-Z]$/)[0]).toBeInTheDocument();
      expect(screen.getAllByTestId(/^[0-9]+[A-Z]$/).length).toBe(
        store.getState().boardReducer.charSize
      );
    });

    test("should contain a restart Button", () => {
      render(boardComponent);
      const restartButton = screen.getByTestId("restart");

      expect(restartButton).toBeInTheDocument();
      expect(restartButton).toHaveStyle({ display: "none" });
    });

    test("should contain a successModal", () => {
      render(boardComponent);
      const successModal = screen.getByTestId("successModal");

      expect(successModal).toBeInTheDocument();
      expect(successModal).toHaveStyle({ display: "none" });
    });
  });

  describe("first tile click", () => {
    it("should render the restart button", () => {
      render(boardComponent);
      store.clearActions();
      const restartButton = screen.getByTestId("restart");

      expect(restartButton).toHaveStyle({
        display: "none",
      });

      fireEvent.click(screen.getAllByTestId(/^[0-9]+[A-Z]$/)[0]);

      expect(store.getAction(2)).toEqual({
        payload: undefined,
        type: "timerSlice/startTimer",
      });

      expect(store.getAction(3)).toEqual({
        payload: undefined,
        type: "boardSlice/setRestartButton",
      });

      expect(restartButton).toHaveStyle({
        display: "block",
      });

      expect(restartButton.textContent).toBe("Restart");
    });
  });

  describe("game completion", () => {
    test("should display the success message, flip count and update the restart text", () => {
      jest.useFakeTimers();
      render(boardComponent);

      const restartButton = screen.getByTestId("restart");
      const successElement = screen.getByTestId("successModal");

      expect(successElement).toBeInTheDocument();
      expect(successElement).toHaveStyle("display:none");

      expect(restartButton).toBeInTheDocument();
      expect(restartButton.textContent).toBe("Restart");
      expect(restartButton).toHaveStyle("display:none");

      simulateWin();

      act(() => {
        jest.runAllTimers();
      });

      expect(store.getAction()).toEqual({
        payload: undefined,
        type: "boardSlice/endGame",
      });

      expect(successElement).toHaveStyle("display:grid");
      expect(
        screen.getByText(
          `Total flips: ${store.getState().tileReducer.flipCount}`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Time: ${store.getState().timerReducer.time}`)
      ).toBeInTheDocument();
      expect(restartButton.textContent).toBe("New Game");
    });
  });

  describe("restart button", () => {
    test("should reset the board and re-shuffle the tiles", () => {
      render(boardComponent);
      const restartButton = screen.getByTestId("restart");
      const [card1, card2] = screen.getAllByTestId(/^[0-9]+A$/);
      const initialTileOrder = store.getState().boardReducer.charsUsed;

      fireEvent.click(card1);
      fireEvent.click(card2);

      expect(store.getState().tileReducer.matching).toContain("A");

      store.clearActions();
      fireEvent.click(restartButton);

      const actions = store.getAction("all");

      expect(actions[0]).toEqual({
        payload: undefined,
        type: "timerSlice/resetTimer",
      });
      expect(actions[1]).toEqual({
        payload: undefined,
        type: "tileSlice/resetAllTiles",
      });
      expect(actions[2]).toEqual({
        payload: undefined,
        type: "boardSlice/resetState",
      });
      expect(actions[3]).toEqual({
        payload: undefined,
        type: "boardSlice/shuffleTiles",
      });

      expect(restartButton).toHaveStyle("display:none");
      expect(store.getState().boardReducer.charsUsed).not.toBe(
        initialTileOrder
      );
      expect(store.getState().tileReducer.matching).not.toContain("A");
    });
  });

  describe("New Game button", () => {
    test("should hide the success screen", () => {
      jest.useFakeTimers();
      render(boardComponent);

      const restartButton = screen.getByTestId("restart");
      const successElement = screen.getByTestId("successModal");

      expect(successElement).toHaveStyle("display: none");

      simulateWin();

      act(() => {
        jest.runAllTimers();
      });

      expect(successElement).toHaveStyle("display: grid");

      expect(restartButton.textContent).toBe("New Game");

      store.clearActions();
      fireEvent.click(restartButton);
      expect(store.getAction(2)).toEqual({
        payload: undefined,
        type: "boardSlice/resetState",
      });

      expect(successElement).toHaveStyle("display: none");
    });
  });
});
