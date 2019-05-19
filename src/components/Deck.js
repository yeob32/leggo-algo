import React from 'react';

import { connect } from 'react-redux';

import { Popconfirm, Popover, message, Icon, Button, Badge } from 'antd';

import socketUtils from '../utils/socketUtil';

import './Deck.css';

class Deck extends React.PureComponent {
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
  };

  cancel = e => {
    // message.error( '취소' );
  };

  checkCurrentMember = () => {
    return this.props.member.id === this.props.sessionReducer.id;
  };

  render() {
    const { deck, member, enableSelectCard } = this.props;
    const { turn, auth } = this.props.sessionReducer;

    const disabled = !auth.random || deck.flip; // TODO flip - false, rnadom - true 인것만 클릭 가능

    const content = enableSelectCard.map( enableCard => (
      <Popconfirm
        title="Do you want to select this card?"
        onConfirm={() => this.confirm( enableCard, deck, member.id )}
        onCancel={this.cancel}
        okText="Yes"
        cancelText="No"
        icon={(
          <Icon
            type="question-circle-o"
            style={{ color: 'red' }}
          />
)}
        key={enableCard.id}
      >
        <Button key={enableCard.id}>{enableCard.name}</Button>
      </Popconfirm>
    ) );

    const wrapperComponent = child => {
      const check = this.checkCurrentMember();

      let deckContext = '';
      let trigger = '';
      let buttonType = 'default';

      if ( check ) {
        // 내 카드
        deckContext = deck.name;
        trigger = '';
        buttonType = deck.flip ? 'danger' : 'primary';
      } else {
        deckContext = deck.flip ? deck.name : <Icon type="smile" />;
        if ( turn && !disabled ) {
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
          <Badge count={(
            <Icon
              type="clock-circle"
              style={{ color: '#f5222d' }}
            />
)}
          >
            <a>
              <div
                className="deck-shape"
                style={{ backgroundColor: deck.type === 'black' ? '#3E3C3C' : '#FAF5F5' }}
              >
                <div className="deck-detail">{deckContext}</div>
              </div>
            </a>

            {/* <a
              href=""
              className="deck-shape"
            >
              {deckContext}
            </a> */}
            {/* <Button type={buttonType}>{deckContext}</Button> */}
          </Badge>
        </Popover>
      );
    };

    return wrapperComponent( content );
  }
}

export default connect( state => state )( Deck );
