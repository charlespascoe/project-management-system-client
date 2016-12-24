Feature: US-4.3
    As a worker,
    I want to see all tasks assigned to me

    Scenario: Viewing a project
        Given I am a user with projects
        And I am logged in
        When I view a project
        Then I should be on the "Example Project" page
        And I should see a panel called "Assigned to Me"
        And I should see a panel called "Unassigned"
        And I should see a panel called "Other Tasks"
        And I should see a panel called "Completed"
        And I should see "Assigned Task" in the "Assigned to Me" panel
