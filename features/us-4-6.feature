Feature: US-4.6
    As a worker,
    I want to view a task within a project

    Scenario: Navigating to a task from the project
        Given I am a user with projects
        And I am logged in
        And I am viewing a project
        Then I should be on the "Example Project" page
        When I click to view the "Example Task" task
        Then I should be on the "EXAMPLE-1: Example Task" page
        And I should see a panel called "Details"
        And I should see a panel called "Description"
        And I should see a panel called "Work Log"
