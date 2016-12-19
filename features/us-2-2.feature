Feature: US-2.2
    As a system administrator,
    I want to deactivate users of the system

    Scenario: Attempting to deactivate a user, but cancelling on the confirmation dialogue
        Given I am on the Administration page
        When I click the delete icon
        Then I should see the "Confirm Delete User" dialogue
        When I click the "Cancel" button
        And I wait 1 second
        Then I should not see the "Confirm Delete User" dialogue
        And I should not see a loading animation

    Scenario: Deactivating a user
        Given I am on the Administration page
        When I click the delete icon
        Then I should see the "Confirm Delete User" dialogue
        When I click the "Delete User" button
        Then I should see a loading animation
        When I wait 0.2 seconds
        Then I should see a notification saying "Removed Bob Smith as a user"
