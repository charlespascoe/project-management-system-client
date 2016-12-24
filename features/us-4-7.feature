Feature: US-4.7
    As a woker,
    I want to transfer a task to another user by assigning it to them

    Scenario: Removing the current assignee
        Given I am a user with projects
        And I am logged in
        And I am viewing a task
        When I click the "Edit Task" button
        Then I should be on the "Edit EXAMPLE-1" page
        When I select "Unassigned" from the "Assignee" dropdown
        And I click the "Save" button
        Then I should see an alert saying "Saving..."
        When I wait 0.2 seconds
        Then I should be on the "EXAMPLE-1" page
        And I should see a notification saying "Successfully saved changes to EXAMPLE-1"
        And I should see "Assignee: Unassigned"

    Scenario: Changing the current assignee
        Given I am a user with projects
        And I am logged in
        And I am viewing a task
        When I click the "Edit Task" button
        Then I should be on the "Edit EXAMPLE-1" page
        When I select "Jane Dough" from the "Assignee" dropdown
        And I click the "Save" button
        Then I should see an alert saying "Saving..."
        When I wait 0.2 seconds
        Then I should be on the "EXAMPLE-1" page
        And I should see a notification saying "Successfully saved changes to EXAMPLE-1"
        And I should see "Assignee: Jane Dough
