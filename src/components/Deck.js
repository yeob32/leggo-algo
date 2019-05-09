import React from 'react';

import { connect } from 'react-redux';

import { Popconfirm, Popover, message, Icon, Button } from 'antd';

class Deck extends React.PureComponent {
  confirm = e => {
    message.success( '맞춤' );
  };

  cancel = e => {
    message.error( '틀렸다네' );
  };

  checkCurrentMember = () => {
    return this.props.member.id === this.props.sessionReducer.id;
  };

  render() {
    const { deck, piles } = this.props;
    const { turn } = this.props.sessionReducer;

    const content = piles.map( pile => (
      <Popconfirm
        title="Do you want to select this card?"
        onConfirm={this.confirm}
        onCancel={this.cancel}
        okText="Yes"
        cancelText="No"
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
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
        <Popover content={child} title="카드 선택" trigger={trigger}>
          <Button>{deckContext}</Button>
        </Popover>
      );
    };

    return wrapperComponent( content );
  }
}

export default connect( state => state )( Deck );
