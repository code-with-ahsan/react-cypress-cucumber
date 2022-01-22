import {
  Given,
  Then,
  Before,
  When,
  And,
} from "cypress-cucumber-preprocessor/steps";

const baseUrl = Cypress.env("baseUrl");

Before(() => {
  cy.intercept(
    "https://api.github.com/orgs/code-with-ahsan/repos?type=public",
    {
      fixture: "projects.json",
    }
  ).as("projects");
});

Given("I am on the login page", () => {
  cy.visit(`${baseUrl}/#/login`);
});

When(
  "I login using email {string} and password {string}",
  (email, password) => {
    cy.login(email, password);
  }
);

And("I enter {string} as the password", (password) => {
  cy.get("#password").type(password);
});

And("I enter {string} as the email", (email) => {
  cy.get("#email-address").type(email);
});

And("I click on the login button", () => {
  cy.get("#loginSubmit").click();
});

Then("I should be logged in", () => {
  cy.url().should("equal", `${Cypress.env("baseUrl")}/#/`);
});

Then("I should see the email required error", () => {
  const emailErrorElement = cy.get("#emailError");
  emailErrorElement.should("be.visible");
  emailErrorElement.should("have.text", "Email is required 🤷‍♀️");
});

Then("I should see the password required error", () => {
  const emailErrorElement = cy.get("#passwordError");
  emailErrorElement.should("be.visible");
  emailErrorElement.should("have.text", "Password is required (LOL 😂)");
});
