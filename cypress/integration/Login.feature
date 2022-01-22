Feature: Login Page
  I want to be able to log in
  
  Scenario: Login using valid credentials
    Given I am on the login page
    When I login using email "ahsan@test.com" and password "123456"
    Then I should be logged in

  Scenario: See email required error when the email is not provided
    Given I am on the login page
    And I enter "123456" as the password
    And I click on the login button
    Then I should see the email required error

  Scenario: See password required error when the email is not provided
    Given I am on the login page
    When I enter "ahsan@test.com" as the email
    And I click on the login button
    Then I should see the password required error