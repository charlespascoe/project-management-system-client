Feature: US-3.8
    As a project administrator,
    I want to transfer a task to another user by assigning it to them

    @incomplete
    Scenario: Removing the current assignee
        Given I am logged in
        And I am viewing task EXAMPLE-1
        When I click the "Edit Task" button
        Then I should be on the "Edit EXAMPLE-1" page
        When I select "Unassigned" from the "Assignee" dropdown
        And I click the "Save" button
        Then I should see an alert saying "Saving..."
        When I wait a bit
        Then I should be on the "EXAMPLE-1" page
        And I should see a notification saying "Successfully saved changes to EXAMPLE-1"
        And I should see "Assignee: Unassigned"

    @incomplete
    Scenario: Changing the current assignee
        Given I am logged in
        And I am viewing task EXAMPLE-1
        When I click the "Edit Task" button
        Then I should be on the "Edit EXAMPLE-1" page
        When I select "Jane Dough" from the "Assignee" dropdown
        And I click the "Save" button
        Then I should see an alert saying "Saving..."
        When I wait a bit
        Then I should be on the "EXAMPLE-1" page
        And I should see a notification saying "Successfully saved changes to EXAMPLE-1"
        And I should see "Assignee: Jane Dough"
