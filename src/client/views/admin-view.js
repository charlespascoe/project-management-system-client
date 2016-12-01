import View from 'client/views/view';
import React from 'react';
import Icon from 'client/views/icon';
import AdminViewmodel from 'client/viewmodels/admin-viewmodel';
import CollapsiblePanel from 'client/views/collapsible-panel';
import { LoadingAlert, AlertContainer } from 'client/views/alerts';

class UserItem extends View {
  constructor(props) {
    super(props, props.viewmodel);
  }

  render() {
    return (
      <tr className='user'>
        <td className='name'>{this.viewmodel.fullName}{this.viewmodel.isCurrentUser ? <span className='you'>(You)</span> : ''}</td>
        <td>{this.viewmodel.email}</td>
        {this.viewmodel.isCurrentUser ?
            <td></td>
          :
            this.viewmodel.loading ?
              <td className='loading'><div className='icon-container absolute-center'><span className='glyphicon glyphicon-cog rotating'></span></div></td>
            :
              <td className='delete' onClick={() => this.viewmodel.delete()}><span className='glyphicon glyphicon-remove absolute-center'></span></td>
        }
      </tr>
    );
  }
}

class ProjectItem extends View {
  constructor(props) {
    super(props, props.viewmodel);
  }

  render() {
    return (
      <tr onClick={() => this.viewmodel.goToProject()}>
        <td>{this.viewmodel.id}</td>
        <td>{this.viewmodel.name}</td>
        <td>{this.viewmodel.memberCount}</td>
      </tr>
    );
  }
}

export default class AdminView extends View {
  constructor(props) {
    super(props, AdminViewmodel.createDefault());
  }

  render() {
    return (
      <div>
        <div className='container-flex header-bar'>
          <h1 className='text-center'>Administration</h1>
        </div>
        <div className='container'>
          <AlertContainer collapsed={!this.viewmodel.loading}>
            <LoadingAlert message='Loading...' />
          </AlertContainer>
          <CollapsiblePanel title='Users' type='primary' padding={false}>
            <table className='admin-users-table table table-striped no-margin'>
              <colgroup>
                <col className='name-col' />
                <col className='email-col' />
                <col className='delete-col'/>
              </colgroup>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.viewmodel.users.map(userVm => <UserItem viewmodel={userVm} key={userVm.id} />)}
              </tbody>
            </table>
            <button className='btn btn-default panel-button' onClick={() => this.viewmodel.addUser()}>
              <Icon type='plus' />Add User
            </button>
          </CollapsiblePanel>

          <CollapsiblePanel title='Projects' type='primary' padding={false}>
            <table className='table table-striped no-margin'>
              <colgroup>
                <col className='key-col' />
                <col className='name-col' />
                <col className='members-col' />
              </colgroup>
              <thead>
                <tr>
                  <th>Project Key</th>
                  <th>Project Name</th>
                  <th># of Members</th>
                </tr>
              </thead>
              <tbody>
                {this.viewmodel.projects.map(projVm => <ProjectItem viewmodel={projVm} key={projVm.id} />)}
              </tbody>
            </table>
            <button className='btn btn-default panel-button' onClick={() => this.viewmodel.addProject()}>
              <Icon type='plus' />Create Project
            </button>
          </CollapsiblePanel>
        </div>
      </div>
    );
  }
}
