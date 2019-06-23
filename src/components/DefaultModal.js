import React from 'react';
import { connect } from 'react-redux';

import { toggleModal } from '../store/modal/actions';
import socketUtil from '../utils/socketUtil';

import { Modal, Radio, Icon, Row, Col } from 'antd';

class DefaultModal extends React.PureComponent {
  state = {
    value: '',
  };

  handleOk = e => {
    this.props.toggle( { visible: false } );

    if ( !this.state.value ) {
      return;
    }

    const index = this.state.value.split( '_' )[1];
    socketUtil().emit( 'select-joker-position', {
      id: this.props.sessionReducer.id,
      position: index - 1,
    } );
  };

  handleCancel = e => {
    this.props.toggle( { visible: false } );
  };

  onChange = e => {
    this.setState( {
      value: e.target.value,
    } );
  };

  render() {
    const decks = this.props.sessionReducer.deck;
    const { visible } = this.props.modalReducer;
    const radioValue = this.state.value;

    // TODO 조커 끼워넣을 때 배열 포지션 체크................
    const radioComponents =
      decks &&
      decks.map( ( deck, index ) => {
        if ( deck.joker && !deck.fixed ) {
          return;
        }

        return (
          <React.Fragment>
            {index === 0 && (
              <Col span={3}>
                <Radio.Button value={`temp_${ index }`}>
                  <Icon type="check-square" />
                </Radio.Button>
              </Col>
            )}

            <Col span={3}>
              <Radio.Button
                disabled
                value={`deck_${ index }`}
              >
                {deck.name}
              </Radio.Button>
            </Col>
            <Col span={3}>
              <Radio.Button value={`temp_${ index + 1 }`}>
                <Icon type="check-square" />
              </Radio.Button>
            </Col>
          </React.Fragment>
        );
      } );

    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={this.handleOk}
          okButtonProps={{ disabled: !radioValue }}
          cancelButtonProps={{ disabled: true }}
          width="800"
          // onCancel={this.handleCancel}
        >
          <div>
            <Radio.Group
              onChange={this.onChange}
              value={this.state.value}
            >
              <Row>{radioComponents}</Row>
            </Radio.Group>
          </div>
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
