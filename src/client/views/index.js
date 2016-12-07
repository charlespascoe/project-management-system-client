import viewMap from 'client/navigation/view-map';

import AdminView from 'client/views/admin-view';
viewMap.setView('admin', AdminView);

import LoginView from 'client/views/login-view';
viewMap.setView('login', LoginView);

import HomeView from 'client/views/home-view';
viewMap.setView('home', HomeView);

import ManageProjectView from 'client/views/manage-project-view';
viewMap.setView('manage-project', ManageProjectView);

import ViewProjectView from 'client/views/view-project-view';
viewMap.setView('view-project', ViewProjectView);
