Class Responsibility Collaborator Design
========================================

This is a high-level design of the classes that will be used by the client.

If a class extends another class, it will extend that class in the code, and as a result, inherit the responsibility of the class it extends from.

Data Models
===========

User
----
* Knows
  * User ID
  * Email
  * First Name
  * Other Names
  * Whether or not the user is a sysadmin
  * When the user's sysadmin eleavation expires
* Does
  * Updates the user's details
* Collaborators
  * Response
  * UsersApi

Project
-------
* Knows
  * Project ID
  * Project Name
  * Project Icon URL
  * Date of Completion
  * The project's members
  * The permissions the current user has in the project
* Does
  * Updates the project details
  * Gets the project's members from the platform
  * Adds a member to the project
  * Gets the current user's project permissions
  * Gets project tasks
  * Adds a task
* Collaborators
  * MembersApi
  * ProjectsApi
  * Response
  * TasksApi

Member
------
* Knows
  * The project
  * The user
  * Their role
* Does
  * Removes the member from the project
  * Changes the member's role
* Collaborators
  * MembersApi
  * PermissionsManager
  * Response

Task
----
* Knows
  * The task's project
  * Task ID
  * Summary
  * Description
  * Creation Date
  * Target Completion Date
  * The task's state (Open, In Progress, and Completed)
  * When the task was completed
  * Priority (1-5)
  * Estimated Effort
  * The assigned user ID
* Does
  * Updates the task details
  * Gets the task's work log
  * Adds a work log entry
* Collaborators
  * PermissionsManager
  * Project
  * Response
  * TasksApi
  * WorkLogApi

WorkLogEntry
------------
* Knows
  * The task this work log entry belongs to
  * Work log entry ID
  * The user ID the log entry belongs to
  * Log description
  * Log effort
  * Log timestamp
* Does
  * Deletes the work log entry
* Collaborators
  * PermissionsManager
  * Response
  * Task
  * WorkLogApi

Data Access Classes
===================

Status Classes
--------------
There are a special set of Status classes, extending from a base `Status` class, that will be used to represent various response statuses.

If a class collaborates with the `Status` class, it means that it will be using any of the subclasses of `Status`. *(Needs further explanation)*

RestResponse
------------
* Knows
  * The status code of the response
  * The parsed JSON object of the response

RestClient
----------
* Knows
  * The base URL for all requests
  * Headers to attach to all requests
* Does
  * Make requests to different URLs
  * Serialise/Deserialise data (just JSON, for now)
* Collaborators
  * RestResponse

AuthenticationApi
-----------------
* Knows
  * The base URL for all authentication requests
* Does
  * Handle login requests
  * Handle token refresh requests
  * Handles requests to trigger a password reset for a user (not the current user)
* Collaborators
  * RestClient
  * RestResponse
  * Status

AuthenticationClient
--------------------
* Knows
  * OAuth tokens
* Does
  * Saves/loads OAuth tokens to storage
  * Appends authorisation headers to all requests made through it
  * Automatically refreshes tokens when the access token expires, and retries the request
* Collaborators
  * AuthenticationApi
  * Response
  * RestClient
  * RestResponse
  * Status

UsersCache
----------
* Knows
  * A map of user IDs onto User models
* Does
  * Finds a User model or creates a new one
* Collaborators
  * User

UsersApi
--------
* Knows
  * The base URL for all requests
* Does
  * Handles requests to create a user
  * Handles requests to deactivate a user
  * Handles requests to get all users
  * Handles requests to get a specific user's details (names, email, etc.)
  * Handles requests to get all projects a user is assigned to
  * Handles requests to change user information (except sysadmin status)
* Collaborators
  * AuthenticationClient
  * Response
  * RestResponse
  * Status
  * User
  * UsersCache

ProjectsCache
-------------
* Knows
  * A map of project IDs onto Project models
* Does
  * Finds a Project model or creates a new one
* Collaborators
  * Project

ProjectsApi
-----------
* Does
  * Handles requests to get all projects
  * Handles requests to get a project's details
  * Handles requests to get all members in a project
  * Handles requests to create a project
  * Handles requests to mark a project as complete
* Collaborators
  * AuthenticationClient
  * ProjectsCache
  * Response
  * RestResponse
  * Status

MembersCache
------------
* Knows
  * A map of project ID and user ID pairs onto Member models
* Does
  * Finds a Member model or creates a new one
* Collaborators
  * Member

MembersApi
----------
* Does
  * Handles requests to get all project members
  * Handles requests to add a member
  * Handles requests to update a member's role
  * Handles requests to remove a member
* Collaborators
  * AuthenticationClient
  * MembersCache
  * Response
  * RestResponse
  * Status

TasksCache
----------
* Knows
  * A map of project ID and task ID pairs onto Task models
* Does
  * Finds a Task model or creates a new one
* Collaborators
  * Task

TasksApi
--------
* Does
  * Handles requests to get a project's tasks
  * Handles requests to get a specific task's details
  * Handles requests to create a task
  * Handles requests to update a task
  * Handles requests to get all work log entries for a task
  * Handles requests to add a work log entry to a task
  * Handles requests to delete a work log entry
* Collaborators
  * AuthenticationClient
  * Response
  * RestResponse
  * Status
  * TasksCache

Business Logic Classes
======================

UserManager
------------
* Knows
  * The currently logged in user
* Does
  * Logs in
  * Logs out
  * Handles elevation (requesting/dropping)
  * Handles login expiry
* Collaborators
  * AuthenticationClient
  * UsersApi
  * AuthenticationApi
  * NotificationQueue

PermissionsManager
------------------
* Knows
  * Whether or not the current user is a Sysadmin
* Does
  *
* Collaborators
  * UserManager

UsersManager
------------
* Knows
  * A cached list of users
* Does
  * Gets all system users
  * Stores users in/loads users from local storage for offline functionality
  * Creates a user
  * Deletes a user
* Collaborators
  * UserManager
    * Used to check sysadmin priviledges
  * UsersApi

ProjectsManager
---------------
* Knows
  * A cached list of projects
* Does
  * Get all projects
  * Stores projects in/loads projects from local storage for offline functionality
  * Get all project members
  * Stores projects members in/loads projects members from local storage for offline functionality
  * Loads project members
  * Creates a project
  * Updates a project
  * Marks a project as complete
* Collaborators
  * ProjectsApi
  * Response


Navigation
==========
*Description*

Navigation
----------
* Knows
* Does

Router
------
* Knows
* Does

ViewMap
-------
* Knows
* Does

LoginNavigator
--------------
* Knows
* Does
* Collaborators

HomeNavigator
-------------

AdminNavigator
--------------

ProjectNavigator
----------------

TaskNavigator
-------------

Viewmodels
==========

Viewmodel
---------
* Knows
  * All 'changed' event handlers
* Does
  * Fires all 'changed' event handlers when the viewmodel changes

LoginViewmodel (Extends Viewmodel)
----------------------------------
* Knows
  * The entered username
  * The entered password
  * Whether or not to remember the user
  * Whether or not the input is valid
  * Whether or not the client is contacting the server
  * The error message
* Does
  * Initiates a login and informs the user of the result
* Collaborators
  * Response
  * Status
  * UserManager

Admin Viewmodels
================

UserViewmodel (Extends Viewmodel)
---------------------------------
* Knows
  * The User data model
  * Whether or not the client is contacting the server to delete the user
  * The 'delete' event handler
* Does
  * Initiates deleting the system user
  * Informs the user of the result via a notification
  * Fires 'delete' event
* Collaborators
  * AdminNavigator
  * NotificationQueue
  * User
  * UserManager

ProjectViewmodel (Extends Viewmodel)
------------------------------------
* Knows
  * The Project data model
* Does
  * Initiates navigation to the View Project page
* Collaborators
  * AdminNavigator
  * Project

AdminViewmodel (Extends Viewmodel)
----------------------------------
* Knows
  * The list of UserViewmodels that represents all system users
  * The list of ProjectViewmodels that represents all projects
  * Whether or not the client is communicating with the server to get users/projects
* Does
  * Initiates loading users/projects from the server
  * Initiates adding a user via the Add User dialogue
  * Initiates adding a project via the Create Project dialogue
* Collaborators
  * ProjectViewmodel
  * UserViewmodels

Manage Project Page Viewmodels
=========================

MemberViewmodel (Extends Viewmodel)
-----------------------------------
* Knows
  * The member's user ID
  * Member's name
  * A list of all roles the member can have
  * The user's role
  * Whether or not the member is the current user
* Does
  * Removes the member from the project (after showing confirmation dialogue)
  * Changes the member's role in the project
* Collaborators
  * Member
  * NotificationQueue
  * Response

ManageProjectViewmodel (Extends Viewmodel)
------------------------------------------
* Knows
  * The project's name
  * The project's ID
  * A list of the project's members
  * Whether or not it is loading the project members from the server
* Does
  * Load the project members from the server
  * Triggers the Add Member dialogue
* Collaborators
  * MemberViewmodel
  * NotificationQueue
  * Project
  * ProjectNavigator
  * Response
  * Status

View Project Page Viewmodels
============================

TaskViewmodel (Extends Viewmodel)
---------------------------------
* Knows
  * A task
  * The task's identifier (project ID + task ID)
  * The task's summary
  * Target completion date
  * Task state
  * The assigned user, if any
  * Estimated Effort
  * Logged Effort
  * Remaining Effort
  * When the task was completed (if it has been completed)
  * Whether or not the details panel is open
  * Whether or not it is contacting the server
* Does
  * Triggers the Log Work dialogue
  * Assign the task to the current user (if it hasn't already been assigned)
  * Change the task's state
  * Navigates to the Edit Task page
  * Navigates to the View Task page
  * Toggles the details panel
* Collaborators
  * Response
  * Status
  * Task
  * TaskNavigator
  * User

ViewProjectViewmodel (Extends Viewmodel)
----------------------------------------
* Knows
  * The project
  * The project's name
  * The project's ID
  * A list of the project's tasks
* Does
  * Navigates to the Add Task page
  * Navigates to the Manage Project page
* Collaborators
  * PermissionsManager
  * ProjectNavigator
  * TaskNavigator
  * TaskViewmodel

Dialogue Viewmodels
===================

DialogueViewmodel (Extends Viewmodel)
-------------------------------------
* Knows
  * The 'dismiss' event handler
* Does
  * Fires the 'dismiss' event handler



Views
=====

NotificationQueue
-----------------
* Knows
  * A queue of notifications
  * The currently displayed notification
* Does
  * Displays a notification
  * Removes the notification after a set period of time
* Collaborators
  * Notification

View
----
The base class for all views
* Knows
  * The viewmodel for this view
* Does
  * Triggers a view render each time the viewmodel changes

Dialogue (Extends View)
-----------------------
* Knows
  * The 'dismiss' event handler
  * Whether or not the dialogue is visible
* Does
  * Renders the HTML for the dialogue frame
  * Hides the dialogue when dismissed and fires the 'dismiss' event handler

