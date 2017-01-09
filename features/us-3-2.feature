Feature: US-3.2
    As a project administrator,
    I want to change the role a member has within a project

    Scenario: Change a project member's role
        Given I am logged in
        And I am managing the EXAMPLE project
        When I select "Worker" from the "Role" dropdown for the first entry in the "Project Members" list
        And I wait a bit
        Then I should see a loading animation
        When I wait a bit
        Then I should see a notification saying "Successfully changed the role of Bob Smith to Worker"
