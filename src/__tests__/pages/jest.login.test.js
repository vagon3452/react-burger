import { LoginPage } from "../../pages";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../services/store";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
jest.mock("react-dnd", () => ({
  useDrag: jest.fn(),
  useDrop: jest.fn(),
  DndProvider: jest.fn(),
}));
jest.mock("react-dnd-html5-backend", () => ({
  HTML5Backend: jest.fn(),
}));
describe("test login page", () => {
  it("can render", () => {
    render(
      <Router>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </Router>
    );
    expect(screen.getByText(/Войти/i)).toBeInTheDocument();
  });
});
