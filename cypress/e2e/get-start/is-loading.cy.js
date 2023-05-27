describe("service is available", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "postOrder"
    );

    // Устанавливаем токены:
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
  });
  it("test1", () => {
    cy.contains("Личный кабинет");
    const bun = 
    // cy.get("[data-testid=60666c42cc7b410027a1a9b1]").click()
    cy.get("60666c42cc7b410027a1a9b1").trigger('dragstart')
  });
});
