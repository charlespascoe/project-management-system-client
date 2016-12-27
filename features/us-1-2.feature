Feature: US-1.2
    As a user,
    I want to log into the system

    Scenario: Invalid login credentials
        Given I am on the login page
        When I enter incorrect login details
        And I press the login button
        And I wait a bit
        Then I should see an alert saying "Signing in..."
        When I wait a bit
        Then I should see an alert saying "Incorrect username or password"

    Scenario: Correct login credentials
        Given I am on the login page
        When I enter correct login details
        And I press the login button
        Then I wait a bit
        Then I should be on the "Home" page
