/// <reference types="cypress" />

describe("App", () => {
  beforeEach(() => {
    cy.intercept(
      "https://api.github.com/orgs/code-with-ahsan/repos?type=public",
      {
        fixture: "projects.json",
      }
    ).as("projects");
  });
  it("should logout the user on logout click", () => {
    cy.visit("/");
    cy.login();
    cy.get("#logoutButton").click();

    cy.url().should("equal", `${Cypress.env("baseUrl")}/login`);
  });

  it("should see the user's email in the header", () => {
    const testEmail = "emailForTest@test.com";
    cy.visit("/");
    cy.login(testEmail);
    const userEmail = cy.get("#userEmail");
    userEmail.should("be.visible");
    userEmail.should("have.text", testEmail);
  });

  it("should see the list of github projects", () => {
    cy.visit("/");
    cy.login();
    cy.wait("@projects");
    cy.get(".gh-list-item").should("have.length", 16);
  });
});
