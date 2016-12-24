Feature: US-4.5
    As a worker,
    I want to assign an unassigned task to myself

    Scenario: Assigning an unassigned task from the "View Task" page
        Given I am a user with projects
        And I am logged in
        And I am viewing an unassigned task
        Then I should see a "button" with the text "Assign to Me"
        When I click the "Assign to Me" button
        Then I should see an alert saying "Loading..."
        When I wait 0.2 seconds
        Then I should see a notification saying "Assigned EXAMPLE-1 to you"
