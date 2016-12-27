Feature: US-2.1
    As a System Administrator,
    I want to add users to the system

    Scenario: The user tries to create a user with an invalid email address
        Given I am logged in
        And I have been elevated to sysadmin
        And I am on the Administration page
        When I click on "Add User"
        Then I should see the "Add User" dialogue
        When I enter "bobsmith" into the "Email" field
        And I enter "Bob" into the "First Name" field
        And I enter "Smith" into the "Other Names" field
        Then the "Email" input field should be invalid
        But the "First Name" input field should be valid
        And the "Other Names" input field should be valid

    Scenario: The user adds a new user
        Given I am logged in
        And I have been elevated to sysadmin
        And I am on the Administration page
        When I click on "Add User"
        And I enter "Bob" into the "First Name" field
        And I enter "Smith" into the "Other Names" field
        And I enter "bob.smith@mail.com" into the "Email" field
        And I click the "Create User" button
        And I wait a bit
        Then I should see an alert saying "Loading..."
        When I wait a bit
        Then I should see a notification saying "Successfully created user"

