Feature: US-2.2
    As a system administrator,
    I want to deactivate users of the system

    Scenario: Attempting to deactivate a user, but cancelling on the confirmation dialogue
        Given I am logged in
        And I have been elevated to sysadmin
        And I am on the Administration page
        When I wait a bit
        And I click the delete icon
        And I wait a bit
        Then I should see the "Confirm Delete User" dialogue
        When I click the "Cancel" button
        And I wait 1 second
        Then I should not see a dialogue

    Scenario: Deactivating a user
        Given I am logged in
        And I have been elevated to sysadmin
        And I am on the Administration page
        When I wait a bit
        And I click the delete icon
        And I wait a bit
        Then I should see the "Confirm Delete User" dialogue
        When I click the "Delete User" button
        And I wait a bit
        Then I should see a loading animation
        When I wait a bit
        Then I should see a notification saying "Removed Jane Dough as a user"
