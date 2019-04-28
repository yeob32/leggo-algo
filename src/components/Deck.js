import React from 'react';

import { connect } from 'react-redux';

import { Popconfirm, Popover, message, Icon, Button } from 'antd';

class Deck extends React.PureComponent {
  constructor( props ) {
    super( props );

    this.state = {};

    this.checkCurrentMember = this.checkCurrentMember.bind( this );
  }

  confirm = e => {
    message.success( '맞춤' );
  };

  cancel = e => {
    message.error( '틀렸다네' );
  };

  checkCurrentMember = () => {
    return this.props.member.id === this.props.session.id;
  };

  render() {
    const { deck, piles } = this.props;

    console.log( 'this.props >>>>> ', this.props );

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
      if ( check ) {
        // 내 카드
        deckContext = deck.name;
      } else {
        deckContext = deck.flip ? deck.name : <Icon type="smile" />;
      }

      // file => 색깔 구분
      return (
        <Popover content={child} title="카드 선택" trigger="click">
          <Button>{deckContext}</Button>
        </Popover>
      );
    };

    return wrapperComponent( content );
  }
}

export default connect( state => state )( Deck );
