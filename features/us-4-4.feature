Feature: US-4.4
    As a worker,
    I want to see unassigned tasks in a project

    Scenario: Viewing a project
        Given I am logged in
        When I view the EXAMPLE project
        Then I should be on the "Example Project" page
        And I should see a panel called "Assigned to Me"
        And I should see a panel called "Unassigned"
        And I should see a panel called "Other Tasks"
        And I should see a panel called "Completed"
        And I should see "Unassigned Task" in the "Unassigned" panel
