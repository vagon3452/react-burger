describe("auth user", () => {
  beforeEach(() => {
    cy.seedAndVisit();
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "postOrder"
    );
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
  });
  it("should drag", () => {
    cy.get("[data-testid=order-number]").contains("123").should("exist");
  });
});
