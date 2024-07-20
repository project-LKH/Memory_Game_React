import { Tile } from "./Tile";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/mockStore";
import { initializeStyle } from "../../redux/tile/slice";

describe("Tile", () => {
  let tileOneId, tileTwoId, tileThreeId;
  let initialStyle, clickedStyle, matchingStyle;

  beforeAll(() => {
    tileOneId = "0A";
    tileTwoId = "1A";
    tileThreeId = "0B";

    initialStyle = {
      backgroundImage:
        'url("./images/rick_and_morty_portal_1___free_download_by_loaf_of_muffin_dc4z89w-fullview 13.png")',
      cursor: "pointer",
    };

    clickedStyle = {
      borderRadius: "50%",
      backgroundImage: "none",
    };

    matchingStyle = {
      background: "rgba(27, 72, 33, 0.75)",
      color: "white",
    };
  });

  beforeEach(() => {
    act(() => {
      [tileOneId, tileTwoId, tileThreeId].forEach((id) => {
        store.dispatch(initializeStyle(id));
      });
      store.clearActions();
    });
  });

  test("should update it's style when clicked", () => {
    render(
      <Provider store={store}>
        <Tile id={tileOneId} testId={tileOneId} />
      </Provider>
    );

    expect(screen.getByTestId(tileOneId)).toHaveStyle(initialStyle);

    fireEvent.click(screen.getByTestId(tileOneId));

    expect(store.getAction(0)).toEqual({
      payload: "0A",
      type: "tileSlice/setClickedStyle",
    });

    expect(screen.getByTestId(tileOneId)).toHaveStyle(clickedStyle);
  });

  test("should update it's style when it is matched", () => {
    render(
      <Provider store={store}>
        <Tile id={tileOneId} testId={tileOneId} />
        <Tile id={tileTwoId} testId={tileTwoId} />
      </Provider>
    );
    const expectedAction = (payload) => ({
      payload: payload,
      type: "tileSlice/setMatchingStyle",
    });

    expect(screen.getByTestId(tileOneId)).toHaveStyle(initialStyle);
    expect(screen.getByTestId(tileTwoId)).toHaveStyle(initialStyle);

    fireEvent.click(screen.getByTestId(tileOneId));
    fireEvent.click(screen.getByTestId(tileTwoId));

    expect(store.getAction(6)).toEqual(expectedAction(tileTwoId));
    expect(store.getAction(7)).toEqual(expectedAction(tileOneId));

    expect(screen.getByTestId(tileOneId)).toHaveStyle(matchingStyle);
    expect(screen.getByTestId(tileTwoId)).toHaveStyle(matchingStyle);
  });

  test("should revert to its initial style when it is not matched", () => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <Tile id={tileOneId} testId={tileOneId} />
        <Tile id={tileThreeId} testId={tileThreeId} />
      </Provider>
    );
    expect(screen.getByTestId(tileOneId)).toHaveStyle(initialStyle);
    expect(screen.getByTestId(tileThreeId)).toHaveStyle(initialStyle);

    fireEvent.click(screen.getByTestId(tileOneId));
    fireEvent.click(screen.getByTestId(tileThreeId));
    act(() => jest.runAllTimers());

    expect(store.getAction(4)).toEqual({
      payload: "0A",
      type: "tileSlice/initializeStyle",
    });

    expect(screen.getByTestId(tileOneId)).toHaveStyle(initialStyle);
  });
});
