/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("projects")
      .as("projects")
      .then((projects) => {
        cy.intercept("https://api.github.com/orgs*", projects);
      });
  });

  it("should log in with email and password", () => {
    cy.login();
    cy.url().should("equal", `${Cypress.env("baseUrl")}/`);
  });

  it("should show the error message when email is not provided", () => {
    cy.get("#email-address").clear();
    cy.get("#password").type("test123");
    cy.get("#loginSubmit").click();

    const emailErrorElement = cy.get("#emailError");
    emailErrorElement.should("be.visible");
    emailErrorElement.should("have.text", "Email is required 🤷‍♀️");

    cy.wait(2000);
    cy.url().should("equal", `${Cypress.env("baseUrl")}/login`);
  });

  it("should show the error message when password is not provided", () => {
    cy.get("#email-address").type("ahsan@test.com");
    cy.get("#password").clear();
    cy.get("#loginSubmit").click();

    const emailErrorElement = cy.get("#passwordError");
    emailErrorElement.should("be.visible");
    emailErrorElement.should("have.text", "Password is required (LOL 😂)");

    cy.wait(2000);
    cy.url().should("equal", `${Cypress.env("baseUrl")}/login`);
  });
});
