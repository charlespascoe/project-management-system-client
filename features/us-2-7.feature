Feature: US-2.7
    As a system administrator,
    I want to remove a member from the project

    Scenario: Removing a project member
        Given I am logged in
        And I have been elevated to sysadmin
        And I am on the Administration page
        When I click on the View Project icon
        Then I should be on the "Manage Example Project" page
        When I click the remove icon
        And I wait a bit
        Then I should see the "Confirm Remove Member" dialogue
        When I click the "Remove Member" button
        And I wait a bit
        Then I should see a loading animation
        When I wait a bit
        Then I should see a notification saying "Successfully removed Bob Smith as a member"
