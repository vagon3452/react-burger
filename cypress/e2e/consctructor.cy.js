describe("drag and drop test", () => {
  beforeEach(() => {
    cy.seedAndVisit();
    cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", {
      fixture: "user.json",
    });
    cy.intercept("POST", "https://norma.nomoreparties.space/api/auth/login", {
      fixture: "user.json",
    });
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "order.json",
    }).as("postOrder");

    // cy.sendRequestOrder();

    // cy.setToken("test-refreshToken");
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

    cy.get("[data-test=login]").type("www@yandex.ru");
    cy.get("[data-test=pass]").type("1231321312312");
    cy.get("body").type("{enter}");
    cy.get("[data-test=button-order]").contains("Оформить заказ").click();
    cy.wait("@postOrder").its("request.body")
  });
});
