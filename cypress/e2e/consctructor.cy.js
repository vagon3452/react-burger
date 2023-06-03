describe("drag and drop test", () => {
  const bun = "Краторная булка N-200i";
  const bioBurger = "Биокотлета из марсианской Магнолии";
  const sauceSpicy = "Соус Spicy-X";
  const spaceSauce = "Соус фирменный Space Sauce";
  const meat = "Мясо бессмертных моллюсков Protostomia";
  const ingredients = "[data-test=ingredients]";
  const ingredientsArea = "[data-test=ingredients-area]";
  const bunContainer = "[data-test=bun-container]";
  const buttonOrder = "[data-test=button-order]";

  beforeEach(() => {
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken")
    );
    cy.getRequestUser();
    cy.seedAndVisit();
    cy.sendRequestOrder().as("createOrder");
  });
  it("should drag bun", () => {
    cy.get(ingredients).contains(bun).click();
    cy.get("body").type("{esc}");
    cy.get(ingredients).contains(bun).trigger("dragstart");
    cy.get(`${bunContainer}:nth-child(1)`).trigger("drop");
    cy.get(`${bunContainer}:nth-child(1)`)
      .contains(`${bun} (верх)`)
      .should("exist");
    cy.get(`${bunContainer} > *:last-child`)
      .contains(`${bun} (низ)`)
      .should("exist");
  });
  it("should drag ingredients", () => {
    cy.get(ingredients).contains(bioBurger).click();
    cy.get("body").type("{esc}");
    cy.get(ingredients).contains(bioBurger).trigger("dragstart");
    cy.get(ingredientsArea).trigger("drop");
    cy.get(ingredientsArea).contains(bioBurger).should("exist");
  });
  it("order burger", () => {
    cy.get(ingredients).contains(bun).trigger("dragstart");
    cy.get(`${bunContainer}:nth-child(1)`).trigger("drop");
    cy.get(ingredients).contains(bioBurger).trigger("dragstart");
    cy.get(ingredientsArea).trigger("drop");
    cy.get(ingredients).contains(sauceSpicy).trigger("dragstart");
    cy.get(ingredientsArea).trigger("drop");
    cy.get(ingredients).contains(meat).trigger("dragstart");
    cy.get(ingredientsArea).trigger("drop");
    cy.get(ingredients).contains(spaceSauce).trigger("dragstart");
    cy.get(ingredientsArea).trigger("drop");
    cy.get(buttonOrder).contains("Оформить заказ").click();
  });
});
