import React from 'react';
import View from 'client/views/view';
import Icon from 'client/views/icon';
import ManageProjectViewmodel from 'client/viewmodels/manage-project-viewmodel';
import { LoadingAlert, AlertContainer } from 'client/views/alerts';
import CollapsiblePanel from 'client/views/collapsible-panel';

class MemberItem extends View {
  constructor(props) {
    super(props, props.viewmodel);
  }

  render() {
    return (
      <tr>
        <td>{this.viewmodel.name}</td>
        <td>{this.viewmodel.roleName}</td>
        {this.viewmodel.isCurrentUser ?
          <td></td>
        :
          <td>Rm</td>
        }
      </tr>
    );
  }
}

export default class ManageProjectView extends View {
  constructor(props) {
    super(props, ManageProjectViewmodel.createDefault());
  }

  render() {
    return (
      <div>
        <div className='container-flex header-bar'>
          <div className='container' style={{padding: 0}}>
            <div style={{width: '128px', height: '128px', margin: '5px 20px 5px 5px', backgroundColor: 'rgba(255,255,255,0.2)', float:'left'}}></div>
            <h1 style={{marginTop:'5px'}}>Manage <b>{this.viewmodel.projectName}</b><br /><small>{this.viewmodel.projectId}</small></h1>
          </div>
        </div>
        <div className='container'>
          <AlertContainer collapsed={!this.viewmodel.loadingMembers}>
            <LoadingAlert message='Loading...' />
          </AlertContainer>
          <CollapsiblePanel title='Projects' type='primary' padding={false}>
            <table className='table table-striped no-margin' id='project-members-table'>
              <colgroup>
                <col className='name-col' />
                <col className='role-col' />
                <col className='remove-col' />
              </colgroup>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {this.viewmodel.members ? this.viewmodel.members.map(memVm => <MemberItem viewmodel={memVm} key={memVm.id} />) : ''}
              </tbody>
            </table>
            <button className='btn btn-default panel-button' onClick={() => this.viewmodel.addMember().catch(e => console.error(e))}>
              <Icon type='plus' />Add Member
            </button>
          </CollapsiblePanel>
        </div>
      </div>
    );
  }
}
