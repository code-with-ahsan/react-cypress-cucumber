import { Given, Then, Before, When } from "cypress-cucumber-preprocessor/steps";

const baseUrl = Cypress.env("baseUrl");

Before(() => {
  cy.intercept(
    "https://api.github.com/orgs/code-with-ahsan/repos?type=public",
    {
      fixture: "projects.json",
    }
  ).as("projects");
});

Given("I am on the app page", () => {
  cy.visit(baseUrl);
  cy.login();
});

Then("I should see my {int} GitHub projects", (number) => {
  cy.wait("@projects");
  cy.get(".gh-list-item").should("have.length", number);
});

Then("I should see my email in the header", () => {
  const testEmail = "ahsan@example.com";
  const userEmail = cy.get("#userEmail");
  userEmail.should("be.visible");
  userEmail.should("have.text", testEmail);
});

When("I click the logout button", () => {
  cy.get("#logoutButton").click();
});

Then("I should be logged out", () => {
  cy.url().should("equal", `${Cypress.env("baseUrl")}/login`);
});
