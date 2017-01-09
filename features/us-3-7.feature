Feature: US-3.7
    As a project administrator,
    I want to view a task within a project

    @incomplete
    Scenario: Navigating to a task from the project
        Given I am logged in
        And I am on the EXAMPLE project page
        When I click to view the "Example Task" task
        Then I should be on the "EXAMPLE-1: Example Task" page
        And I should see a panel called "Details"
        And I should see a panel called "Description"
        And I should see a panel called "Work Log"
