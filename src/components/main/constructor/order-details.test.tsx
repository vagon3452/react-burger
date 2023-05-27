import { OrderDetails } from "./order-details";
import { render, screen } from "@testing-library/react";

describe("order-details component", () => {
  const testProps = {
    image: "http//:www.rambler.ru",
    number: 42,
  };
  it("is render", () => {
    render(<OrderDetails {...testProps}/>);
    expect(screen.getByText(/идинтификатор заказа/i)).toBeInTheDocument()
  });
});

