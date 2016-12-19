Feature: US-2.5
    As a system administrator,
    I want to add a user to the list of project members

    Scenario: Adding a user to the list of project members
        Given I am on the Administration Page
        When I click on the View Project icon
        Then I should be on the "Manage Example Project" page
        When I click on "Add Member"
        Then I should see the "Add Project Member" dialogue
        When I select "Bob Smith" from the "User" dropdown
        And I select "Worker" from the "Role" dropdown
        And I click on the "Add Member" button
        Then I should see an alert saying "Loading..."
        When I wait 0.2 seconds
        Then I should see a notification saying "Successfully added Bob Smith as a Worker"
