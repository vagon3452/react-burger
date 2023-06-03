import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Create from "./create";

describe("test header", () => {
  it("render create", () => {
    render(
      <Router>
        <Create />
      </Router>
    );
    expect(screen.getByText(/Конструктор/i)).toBeInTheDocument();
  });
});
