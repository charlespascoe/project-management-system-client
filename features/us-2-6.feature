Feature: US-2.6
    As a system administrator,
    I want to change the role a member has within a project

    Scenario: Change a project member's role
        Given I am on the Administration Page
        When I click on the View Project icon
        Then I should be on the "Manage Example Project" page
        When I select "Project Administrator" from the "Role" dropdown
        Then I should see a loading animation
        When I wait 0.2 seconds
        Then I should see a notification saying "Successfully changed the role of Bob Smith to Project Administrator"
