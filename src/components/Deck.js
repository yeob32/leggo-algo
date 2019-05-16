import React from 'react';

import { connect } from 'react-redux';

import { Popconfirm, Popover, message, Icon, Button } from 'antd';

import socketUtils from '../utils/socketUtil';

class Deck extends React.PureComponent {
  confirm = ( pile, deck, member ) => {
    const id = this.props.sessionReducer.id;

    console.log( 'deck > ', deck );
    console.log( 'select pile > ', pile );
    console.log( 'select member > ', member );

    // 뭔가 효과 주자 비루루룽

    if ( deck.id === pile.id ) {
      // 성공
      socketUtils().emit( 'action', 'check-success', {
        id,
        targetMemberId: member.id,
        cardId: deck.id,
      } );
    } else {
      // 실패
      socketUtils().emit( 'action', 'check-fail', { id } );
    }
    // socketUtils().emit( 'action', 'check', { id, cardId: pile.id } );

    message.success( '맞춤' );
  };

  cancel = e => {
    message.error( '틀렸다네' );
  };

  checkCurrentMember = () => {
    return this.props.member.id === this.props.sessionReducer.id;
  };

  render() {
    const { deck, piles, member } = this.props;
    const { turn } = this.props.sessionReducer;

    const content = piles.map( pile => (
      <Popconfirm
        title="Do you want to select this card?"
        onConfirm={() => this.confirm( pile, deck, member.id )}
        onCancel={this.cancel}
        okText="Yes"
        cancelText="No"
        icon={(
          <Icon
            type="question-circle-o"
            style={{ color: 'red' }}
          />
)}
        key={pile.id}
      >
        <Button key={pile.id}>{pile.name}</Button>
      </Popconfirm>
    ) );

    const wrapperComponent = child => {
      const check = this.checkCurrentMember();

      let deckContext = '';
      let trigger = '';

      if ( check ) {
        // 내 카드
        deckContext = deck.name;
        trigger = '';
      } else {
        deckContext = deck.flip ? deck.name : <Icon type="smile" />;
        if ( turn ) {
          trigger = 'click';
        }
      }

      // file => 색깔 구분
      return (
        <Popover
          content={child}
          title="카드 선택"
          trigger={trigger}
        >
          <Button>{deckContext}</Button>
        </Popover>
      );
    };

    return wrapperComponent( content );
  }
}

export default connect( state => state )( Deck );
