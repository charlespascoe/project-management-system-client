import React from 'react';
import View from 'client/views/view';
import Icon from 'client/views/icon';
import { bindValue } from 'client/views/bind';
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
        <td className='table-vertical-middle'>{this.viewmodel.name}</td>
        <td>
          <label className='sr-only'>Select Role</label>
          <select
            className='form-control'
            disabled={this.viewmodel.loading}
            value={this.viewmodel.selectedRoleId}
            onChange={bindValue(this.viewmodel, 'selectedRoleId')}>
              {this.viewmodel.roles.map(role => <option value={role.id} key={role.id}>{role.name}</option>)}
          </select>
        </td>
        {this.viewmodel.loading ?
          <td className='loading'>
            <div className='icon-container absolute-center'>
              <span className='sr-only'>Loading, please wait</span>
              <span className='glyphicon glyphicon-cog rotating'></span>
            </div>
          </td>
        :
          <td className='delete' onClick={() => this.viewmodel.removeMember()}>
            <span className='sr-only'>Click to remove {this.viewmodel.name} from the project</span>
            <span className='glyphicon glyphicon-remove absolute-center'></span>
          </td>
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
            <img id='project-icon' src={this.viewmodel.iconUrl} alt={`${this.viewmodel.projectName} icon`}></img>
            <h1 style={{marginTop:'5px'}}>Manage <b>{this.viewmodel.projectName}</b><br /><small>{this.viewmodel.projectId}</small></h1>
          </div>
        </div>
        <div className='container'>
          <AlertContainer collapsed={!this.viewmodel.loadingMembers}>
            <LoadingAlert message='Loading...' />
          </AlertContainer>
          <CollapsiblePanel title='Project Members' type='primary' padding={false}>
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
