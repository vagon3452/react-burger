describe("the start", () => {
  it("visit home page, get items", () => {
    cy.seedAndVisit();

    cy.get("data-test-ingredients").contains("Краторная булка N-200i").trigger("dragstart");
  });
});
