Cypress.on("uncaught:exception", () => {
  return false;
});

describe("Metashop", () => {
  it("frontpage can be opened", () => {
    cy.visit("http://localhost:4000");
    cy.contains("Original");
  });
});
