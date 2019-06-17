import React from 'react';
import { connect } from 'react-redux';

import { toggleModal } from '../store/modal/actions';

import { Modal, Radio, Icon, Row, Col } from 'antd';

class DefaultModal extends React.PureComponent {
  state = {
    value: 1,
  };

  handleOk = e => {
    this.props.toggle( { visible: false } );
  };

  handleCancel = e => {
    this.props.toggle( { visible: false } );
  };

  onChange = e => {
    console.log( 'radio checked', e.target.value );
    this.setState( {
      value: e.target.value,
    } );
  };

  render() {
    const decks = this.props.sessionReducer.deck;
    const { visible } = this.props.modalReducer;

    const radioComponents =
      visible &&
      decks.map( ( deck, index ) => {
        return (
          <div>
            {index === 0 && (
              <Col span={2}>
                <Radio.Button value="front">
                  <Icon type="check-square" />
                </Radio.Button>
              </Col>
            )}
            <Col span={2}>
              <Radio.Button value={index}>{deck.name}</Radio.Button>
            </Col>
            <Col span={2}>
              <Radio.Button value={'temp' + index}>
                <Icon type="check-square" />
              </Radio.Button>
            </Col>
          </div>
        );
      } );

    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={this.handleOk}
          // onCancel={this.handleCancel}
        >
          <Radio.Group
            onChange={this.onChange}
            value={this.state.value}
          >
            <Row>{radioComponents}</Row>
          </Radio.Group>
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
