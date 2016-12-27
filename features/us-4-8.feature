Feature: US-4.8
    As a worker,
    I want to edit a task

    Scenario: Editing a task
        Given I am logged in
        And I am viewing task EXAMPLE-1
        Then I should see a "button" with the text "Edit"
        When I click the "Edit" button
        Then I should be on the "Edit EXAMPLE-1" page
        When I enter "New Summary" into the "Summary" field
        And I select "P1" from the "Priority" dropdown
        And I click the "Save" button
        Then I should see an alert saying "Saving..."
        When I wait a bit
        Then I should be on the "EXAMPLE-1" page
        And I should see a notification saying "Successfully saved changes to EXAMPLE-1"
