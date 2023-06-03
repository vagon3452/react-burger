import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Create from "../../components/header/header-component/create";
import { store } from "../../services/store";
import { Provider } from "react-redux";
import Person from "../../components/header/header-component/person";
import { createMemoryHistory } from "history";

describe("test header", () => {
  it("render create", () => {
    render(
      <Provider store={store}>
        <Router>
          <Create />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Конструктор/i)).toBeInTheDocument();
  });
});

describe("Component login", () => {
  it("can render", () => {
    render(
      <Router>
        <Provider store={store}>
          <Person />
        </Provider>
      </Router>
    );
    expect(screen.getByText(/Личный кабинет/i)).toBeInTheDocument();
  });
  it("can route to login", () => {
    const history = createMemoryHistory();
    history.push("/login");
    render(
      <Router history={history}>
        <Provider store={store}>
          <Person />
        </Provider>
      </Router>
    );
    expect(screen.getByText(/Личный кабинет/i)).toBeInTheDocument();
  });
});
