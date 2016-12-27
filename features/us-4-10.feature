Feature: US-4.10
    As a worker,
    I want to change the state of a task

    Scenario: Putting an "Open" task into "In Progress"
        Given I am logged in
        And EXAMPLE-1 is "Open"
        And I am viewing task EXAMPLE-1
        Then I should see a "button" with the text "Start Progress"
        When I click the "Start Progress" button
        Then I should see an alert saying "Loading..."
        When I wait a bit
        Then I should see a notification saying "Started progress on EXAMPLE-1"
        And I should see "State: In Progress"

    Scenario: Marking an "In Progress" task as "Complete"
        Given I am logged in
        And EXAMPLE-1 is "In Progress"
        And I am viewing task EXAMPLE-1
        Then I should see a "button" with the text "Mark as Complete"
        When I click the "Mark as Complete" button
        Then I should see an alert saying "Loading..."
        When I wait a bit
        Then I should see a notification saying "Marked EXAMPLE-1 as Complete"
        And I should see "State: Complete"
