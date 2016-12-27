Feature: US-2.4
    As a system administrator,
    I want to create a project

    Scenario: Creating a project
        Given I am logged in
        And I have been elevated to sysadmin
        And I am on the Administration page
        When I click on "Create Project"
        Then I should see the "Create Project" dialogue
        When I enter "EXAMPLE" into the "Project ID" field
        And I enter "Example" into the "Project Name" field
        And I enter "http://www.example.com/test.png" into the "Icon URL" field
        And I click the "Create Project" button
        Then I should see an alert saying "Loading..."
        When I wait a bit
        Then I should see a notification saying "Successfully created Example project"
