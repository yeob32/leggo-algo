import React from 'react';

import { connect } from 'react-redux';

import { Popconfirm, message, Icon, Button } from 'antd';

import socketUtils from '../utils/socketUtil';

import './Deck.css';

class PileDeck extends React.PureComponent {
  constructor( props ) {
    super( props );

    this.state = {
      visible: false,
    };
  }

  confirm = ( enableCard, deck, memberId ) => {
    const id = this.props.sessionReducer.id;
    // 뭔가 효과 주자 비루루룽

    if ( deck.id === enableCard.id ) {
      // 성공
      socketUtils().emit( 'action-check', 'success', {
        id,
        targetMemberId: memberId,
        cardId: deck.id,
      } );

      message.success( '맞춤' );
    } else {
      // 실패
      socketUtils().emit( 'action-check', 'fail', { id } );

      message.success( '틀림' );
    }

    this.setState( { visible: false } );
  };

  cancel = e => {
    this.setState( { visible: false } );
    // message.error( '취소' );
  };

  handleVisibleChange = data => {
    console.log( 'data > ', data );

    this.setState( { visible: data } );
    console.log( 'this.state.visible > ', this.state.visible );
  };

  render() {
    const { enableCard, deck, member } = this.props;
    const { turn } = this.props.sessionReducer;

    return (
      <Popconfirm
        title="Do you want to select this card?"
        onConfirm={() => this.confirm( enableCard, deck, member.id )}
        onCancel={this.cancel}
        okText="Yes"
        cancelText="No"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        icon={(
          <Icon
            type="question-circle-o"
            style={{ color: 'red' }}
          />
)}
        key={enableCard.id}
      >
        <Button
          key={`btn_${ enableCard.id }`}
          style={{
            backgroundColor: enableCard.type === 'black' ? '#3E3C3C' : '#FAF5F5',
            color: enableCard.type === 'black' ? '#FAF5F5' : '#3E3C3C',
          }}
        >
          {enableCard.name}
        </Button>
      </Popconfirm>
    );
  }
}

export default connect( state => state )( PileDeck );
