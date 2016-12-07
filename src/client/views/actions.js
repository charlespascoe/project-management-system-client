import React, { Component } from 'react';

export function ActionsGroup(props) {
  return (
    <div className='actions'>
      <h3 className='text-center'>Actions</h3>
      <div className='btn-group btn-group-justified' style={{maxWidth: '500px', margin: '0 auto'}} role='group' aria-label='Actions'>
        {props.children}
      </div>
    </div>
  );
}

export function ActionButton(props) {
  return (
    <div role='button' className={`btn btn-${props.type || 'default'}`} onClick={props.onClick}>{props.children}</div>
  );
}
