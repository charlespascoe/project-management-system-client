Feature: US-3.3
    As a project administrator,
    I want to remove a member from the project

    Scenario: Removing a project member
        Given I am logged in
        And I am managing the EXAMPLE project
        When I click the remove icon
        And I wait a bit
        Then I should see the "Confirm Remove Member" dialogue
        When I click the "Remove Member" button
        And I wait a bit
        Then I should see a loading animation
        When I wait 1 second
        Then I should see a notification saying "Successfully removed Bob Smith as a member"
