Cypress.on("uncaught:exception", () => {
  return false;
});

describe("MetaShop as an user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.request("POST", "http://localhost:4000/api/v1/testing/reset");
    const user = {
      name: "ismael",
      email: "ismael13@gmail.com",
      password: "ismael123",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    };
    cy.request("POST", "http://localhost:4000/api/v1/register", user);
  });
  it("frontpage can be opened", () => {
    cy.contains("Original");
  });
  it("Products Page can be opened", () => {
    cy.contains("Products").click();
  });
  it("Go to login Page when its logged in and then log in with wrong credentials", () => {
    cy.visit("http://localhost:3000");
    cy.get("[id='login-icon']").click();
    cy.contains("Logout").click();
    cy.contains("Login").click();
    cy.get("input:first").type("ismael123@gmail.com");
    cy.get("[placeholder='Password'").type("ismael123");
    cy.contains("Login").click();
    cy.contains("Invalid Email or Password");
  });
  describe("when logged in", () => {
    beforeEach(() => {
      cy.login({ email: "ismael13@gmail.com", password: "ismael123" });
    });
    it("Go to account", () => {
      cy.visit("http://localhost:3000/account");
    });
    it("Go to products page and add to cart", () => {
      cy.contains("Products").click();
      cy.contains("Goku Poster").click();
      cy.contains("Goku Poster");
      cy.contains("Add to Cart").click();
    });
    it("Submits a review on a product", () => {
      cy.contains("Goku Poster").click();
      cy.contains("Submit Review").click();
      cy.contains("2 Stars").click();
      cy.get("textarea:first").type("Poor product, I would never buy it again");
      cy.get("button:last").click();
      cy.contains("Poor product, I would never buy it again");
    });
    it.only("Buy a Product ", () => {
      cy.contains("Products").click();
      cy.contains("T-Shirt Blue").click();
      cy.contains("Add to Cart").click();
      cy.contains("Item Added to Cart");
      cy.get("[id='cart-icon']").click();
      for (let n = 0; n < 2; n++) {
        cy.contains("+").click();
      }
      cy.contains("$360");
      cy.contains("Check out").click();
      cy.get("[placeholder=Address]").type("Caleta de Velex");
      cy.get("[placeholder=City]").type("Malaga");
      cy.get("#number-pinCode").type(1234);
      cy.get("[placeholder='Phone Number']").type(1234567890);
      cy.get("select").select("Spain");
      cy.get("select:last").select("Andalusia");
      // eslint-disable-next-line quotes
      cy.get('[value="Confirm Order"]').click();
      cy.contains("Shipping Info");
      cy.contains("Proceed to Payment").click();

      cy.get("#card-element").within(() => {
        cy.fillElementsInput("cardNumber", "4242424242424242");
        cy.fillElementsInput(
          "cardExpiry",
          "12" + (new Date().getFullYear() + 10).toString().substr(-2)
        );
        cy.fillElementsInput("cardCvc", "123");
      });
      cy.get("#payment-button").click();
      cy.contains("View Orders").click();
      cy.contains("Orders");
    });
  });
});
