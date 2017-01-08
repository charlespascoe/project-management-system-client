Feature: US-4.1
    As a worker,
    I want to see all projects that I can access

    Scenario: A user with no assignments
        Given I am a user with no assignments
        And I am logged in
        Then I should be on the "Home" page
        And I should see "You are not assigned to any projects"

    Scenario: A user with one or more assignments
        Given I am a user with assignments
        And I am logged in
        Then I should be on the "Home" page
        And I should see "Example Project"
