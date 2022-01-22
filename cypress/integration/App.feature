Feature: App Main Page
  I want to see my GitHub projects
  
  Scenario: See my GitHub projects
    Given I am on the app page
    Then I should see my 16 GitHub projects

  Scenario: See user's email in the header
    Given I am on the app page
    Then I should see my email in the header

  Scenario: Log out of the app on the Logout button click
    Given I am on the app page
    When I click the logout button
    Then I should be logged out