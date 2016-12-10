import User from 'client/models/user';
import usersCache from 'client/apis/users-cache';
usersCache.create = User.create;

import Project from 'client/models/project';
import projectsCache from 'client/apis/projects-cache';
projectsCache.create = Project.create;

import Role from 'client/models/role';
import rolesCache from 'client/apis/roles-cache';
rolesCache.create = Role.create;

import Member from 'client/models/member';
import membersCache from 'client/apis/members-cache';
membersCache.create = Member.create;

import Task from 'client/models/task';
import tasksCache from 'client/apis/tasks-cache';
tasksCache.create = Task.create;
