import DifficultySelector from "./DifficultySelector";
import store from "../../redux/mockStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

describe("DifficultySelector", () => {
  let selectorComponent;
  beforeAll(() => {
    selectorComponent = (
      <Provider store={store}>
        <DifficultySelector />
      </Provider>
    );
  });

  describe("initial render", () => {
    it("should render with a default value of 1 for Morty difficulty", () => {
      render(selectorComponent);
      const options = screen.getAllByTestId(/^option-[0-2]$/);

      expect(screen.getByTestId("grid-size").value).toBe("1");

      expect(options[0].selected).toBeFalsy();
      expect(options[1].selected).toBeTruthy();
      expect(options[2].selected).toBeFalsy();
      expect(options[1].textContent).toBe("Morty");
    });
  });

  describe("grid selection", () => {
    it("should dispatch the correct action and payload", () => {
      render(selectorComponent);
      const options = screen.getAllByTestId(/^option-[0-2]$/);

      fireEvent.change(screen.getByTestId("grid-size"), {
        target: { value: 0 },
      });

      expect(store.getAction(0)).toEqual({
        payload: "0",
        type: "gridSlice/adjustGridSize",
      });

      expect(screen.getByTestId("grid-size").value).toBe("0");

      expect(options[0].selected).toBeTruthy();
      expect(options[1].selected).toBeFalsy();
      expect(options[2].selected).toBeFalsy();
    });
  });
});
