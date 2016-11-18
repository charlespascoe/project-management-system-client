import View from 'client/views/view';
import React from 'react';
import AdminViewmodel from 'client/viewmodels/admin-viewmodel';
import CollapsiblePanel from 'client/views/collapsible-panel';
import { LoadingAlert, DangerAlert } from 'client/views/alerts';

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
              <td><span className='glyphicon glyphicon-cog rotating'></span></td>
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
      <tr>
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
      <div className='container'>
        <h1>Admin</h1>
        <CollapsiblePanel title='Users' padding={false}>
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
          <button className='btn btn-primary panel-button' onClick={() => this.viewmodel.addUser()}>Add User</button>
        </CollapsiblePanel>

        <CollapsiblePanel title='Projects' padding={false}>
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
          <button className='btn btn-primary panel-button' onClick={() => this.viewmodel.addProject()}>Add Project</button>
        </CollapsiblePanel>
      </div>
    );
  }
}
