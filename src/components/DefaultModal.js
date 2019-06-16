import React from 'react';
import { connect } from 'react-redux';

import { toggleModal } from '../store/modal/actions';

import { Modal, Button } from 'antd';

class DefaultModal extends React.Component {
  componentDidMount() {
    this.props.toggle( { visible: true } );
  }

  handleOk = e => {
    this.props.toggle( { visible: false } );
  };

  handleCancel = e => {
    this.props.toggle( { visible: false } );
  };

  render() {
    const { visible } = this.props.modalReducer;

    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ( {
  toggle: data => dispatch( toggleModal( data ) ),
} );

export default connect(
  state => state,
  mapDispatchToProps,
)( DefaultModal );
