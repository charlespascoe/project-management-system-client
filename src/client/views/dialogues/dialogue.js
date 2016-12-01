import React from 'react';
import View from 'client/views/view';

const ANIMATION_DURATION = 150;

export default class Dialogue extends View {
  constructor(props, viewmodel) {
    super(props, viewmodel);

    this.state = {
      visible: false
    };

    this.dismiss = this.dismiss.bind(this);
    this.dismissed = false;

    if (this.viewmodel) {
      this.viewmodel.onDismiss = this.dismiss;
    }

    setTimeout(function () {
      if (this.dismissed) return;
      this.setState({visible: true});
    }.bind(this), 20);
  }

  dismiss(result = null) {
    this.dismissed = true;

    if (!this.state.visible) {
      if (this.props.onDismiss) this.props.onDismiss(result);
      return;
    }

    this.setState({visible: false});

    setTimeout(function () {
      if (this.props.onDismiss) this.props.onDismiss(result);
    }.bind(this), ANIMATION_DURATION); // 150ms is duration of fade out transition
  }

  renderFooter() {
    return '';
  }

  render() {
    return (
      <div className={`modal fade visible ${this.state.visible ? 'in' : ''}`} tabIndex='-1' role='dialog' onClick={() => this.dismiss()}>
        <div className='modal-dialog' role='document' onClick={e => e.stopPropagation()}>
          <div className='modal-content panel-primary'>
            <div className='modal-header panel-heading'>
              <button type='button' className='close' aria-label='Close' onClick={() => this.dismiss()}><span aria-hidden='true'>&times;</span></button>
              <h4 className='modal-title text-center'>{this.title}</h4>
            </div>
            {this.renderBody()}
            {this.renderFooter()}
          </div>
        </div>
      </div>
    );
  }
}
