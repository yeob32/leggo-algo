import React from 'react';

import { connect } from 'react-redux';

import { Popover, Icon } from 'antd';

import PileDeck from './PileDeck';

import './Deck.css';

class Deck extends React.PureComponent {
  checkCurrentMember = () => {
    return this.props.member.id === this.props.sessionReducer.id;
  };

  render() {
    const { deck, member, enableSelectCard } = this.props;
    const { turn, auth } = this.props.sessionReducer;

    const disabled = !auth.random || deck.flip;

    const content = enableSelectCard
      .filter( enableCard => enableCard.type === deck.type )
      .map( enableCard => (
        <PileDeck
          enableCard={enableCard}
          deck={deck}
          member={member}
          key={enableCard.id}
        />
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

      return (
        <Popover
          content={child}
          title="카드 선택"
          trigger={trigger}
        >
          <a>
            <div
              className={deck.flip ? 'deck-flip' : 'deck-shape'}
              style={{ backgroundColor: deck.type === 'black' ? '#3E3C3C' : '#FAF5F5' }}
            >
              <div className="deck-detail">{deckContext}</div>
            </div>
          </a>
        </Popover>
      );
    };

    return wrapperComponent( content );
  }
}

export default connect( state => state )( Deck );
