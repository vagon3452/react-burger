describe("drag and drop test", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken")
    );
    cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", {
      fixture: "user.json",
    });
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients",
    });
    cy.visit("http://localhost:3000");

    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "order.json",
    }).as("postOrder");
  });
  it("should drag bun", () => {
    cy.get("[data-test=ingredients]")
      .contains("Краторная булка N-200i")
      .click();
    cy.get("body").type("{esc}");
    cy.get("[data-test=ingredients]")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");
    cy.get("[data-test=bun-container]:nth-child(1)").trigger("drop");
    cy.get("[data-test=bun-container]:nth-child(1)")
      .contains("Краторная булка N-200i (верх)")
      .should("exist");
    cy.get("[data-test=bun-container] > *:last-child")
      .contains("Краторная булка N-200i (низ)")
      .should("exist");
  });
  it("should drag ingredients", () => {
    cy.get("[data-test=ingredients]")
      .contains("Биокотлета из марсианской Магнолии")
      .click();
    cy.get("body").type("{esc}");
    cy.get("[data-test=ingredients]")
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");
    cy.get("[data-test=ingredients-area]").trigger("drop");
    cy.get("[data-test=ingredients-area]")
      .contains("Биокотлета из марсианской Магнолии")
      .should("exist");
  });
  it("order burger", () => {
    cy.get("[data-test=ingredients]")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");
    cy.get("[data-test=bun-container]:nth-child(1)").trigger("drop");
    cy.get("[data-test=ingredients]")
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");
    cy.get("[data-test=ingredients-area]").trigger("drop");
    cy.get("[data-test=ingredients]")
      .contains("Соус Spicy-X")
      .trigger("dragstart");
    cy.get("[data-test=ingredients-area]").trigger("drop");
    cy.get("[data-test=ingredients]")
      .contains("Мясо бессмертных моллюсков Protostomia")
      .trigger("dragstart");
    cy.get("[data-test=ingredients-area]").trigger("drop");
    cy.get("[data-test=ingredients]")
      .contains("Соус фирменный Space Sauce")
      .trigger("dragstart");
    cy.get("[data-test=ingredients-area]").trigger("drop");
    cy.get("[data-test=button-order]").contains("Оформить заказ").click();
  });
});
