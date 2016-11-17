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
          <button className='btn btn-primary add-user' onClick={() => this.viewmodel.addUser()}>Add User</button>
        </CollapsiblePanel>
      </div>
    );
  }
}
