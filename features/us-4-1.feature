Feature: US-4.1
    As a worker,
    I want to see all projects that I can access

    Scenario: A user with no projects
        Given I am a user with no projects
        And I am logged in
        Then I should be on the "Home" page
        And I should see "You have no projects"

    Scenario: A user with one or more projects
        Given I am a user with projects
        And I am logged in
        Then I should be on the "Home" page
        And I should see "Example Project"
