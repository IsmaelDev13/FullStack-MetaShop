Cypress.Commands.add("login", ({ email, password }) => {
  cy.request("POST", "http://localhost:4000/api/v1/login", {
    email,
    password,
  }).then((res) => {
    localStorage.setItem("token", JSON.stringify(res.body));
  });
  cy.visit("http://localhost:3000");
});
