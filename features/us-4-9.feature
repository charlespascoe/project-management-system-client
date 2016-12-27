Feature: US-4.9
    As a worker,
    I want to log effort against a task

    Scenario: Logging work against a task
        Given I am logged in
        And I am viewing task EXAMPLE-1
        Then I should see a "button" with the text "Log Work"
        When I click the "Log Work" button
        Then I should see the "Log Work" dialogue
        When I enter "2h 15m" into the "Effort" field
        And I enter "1h" into the "Remaining Effort" field
        And I enter "Did some work" into the "Comment" field
        And I click the "Submit" button
        Then I should see an alert saying "Loading..."
        When I wait a bit
        Then I should see a notification saying "Logged 2h 15m of work to EXAMPLE-1"
