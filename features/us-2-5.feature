Feature: US-2.5
    As a system administrator,
    I want to add a user to the list of project members

    Scenario: Adding a user to the list of project members
        Given I am logged in
        And I have been elevated to sysadmin
        And I am on the Administration page
        When I wait a bit
        And I click on the View Project icon
        Then I should be on the "Manage Example Project" page
        When I click on "Add Member"
        And I wait a bit
        Then I should see the "Add Project Member" dialogue
        When I select "Jane Dough" from the "User" dropdown
        And I select "Worker" from the "Role" dropdown
        And I click the "Add Member" button in the dialogue
        And I wait a bit
        Then I should see an alert in the dialogue saying "Loading..."
        When I wait a bit
        Then I should see a notification saying "Successfully added Jane Dough as a member"
