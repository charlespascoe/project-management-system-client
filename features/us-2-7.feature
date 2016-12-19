Feature: US-2.7
    As a system administrator,
    I want to remove a member from the project

    Scenario: Removing a project member
        Given I am on the Administration Page
        When I click on the View Project icon
        Then I should be on the "Manage Example Project" page
        When I click on the remove member icon
        Then I should see the "Confirm Remove Member" dialogue
        When I click on the "Remove Member" button
        Then I should see a loading animation
        When I wait 0.2 seconds
        Then I should see a notification saying "Successfully removed Bob Smith as a member"
