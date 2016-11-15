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
      <tr>
        <td>{this.viewmodel.fullName}</td>
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
        <CollapsiblePanel title='Test' padding={false}>
          <table className='table table-striped'>
            <tbody>
              {this.viewmodel.users.map(userVm => <UserItem viewmodel={userVm} key={userVm.id} />)}
            </tbody>
          </table>
          <button className='btn btn-primary' onClick={() => this.viewmodel.addUser()}>Add User</button>
        </CollapsiblePanel>
      </div>
    );
  }
}
