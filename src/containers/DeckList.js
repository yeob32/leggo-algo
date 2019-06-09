import React from 'react';

import { Button } from 'antd';
import Deck from '../components/Deck';

const ButtonGroup = Button.Group;

const DeckList = ( { member, pileCards, discardHolder } ) => {
  // 내 카드 빼고, 상대 뒤집어진 카드 빼고
  const excludedDiscardHolder = discardHolder.filter( discard =>
    member.deck.some( memberDeck => {
      return memberDeck.id === discard.id && !memberDeck.flip;
    } ),
  );

  const enableSelectCardList = excludedDiscardHolder.concat( pileCards );

  console.log( 'pileCards > ', pileCards );
  console.log( 'excludedDiscardHolder > ', excludedDiscardHolder );
  console.log( 'enableSelectCardList > ', enableSelectCardList );

  // TODO 서버에서 처리.... ?
  let temp;
  enableSelectCardList.forEach( ( card, index ) => {
    const random = Math.floor( Math.random() * ( index + 1 ) );

    temp = enableSelectCardList[random];
    enableSelectCardList[random] = card;
    enableSelectCardList[index] = temp;
  } );

  return (
    <div>
      <ButtonGroup>
        {member.deck.map( dck => (
          <Deck
            member={member}
            deck={dck}
            enableSelectCard={enableSelectCardList}
            key={dck.id}
          />
        ) )}
      </ButtonGroup>
    </div>
  );
};

export default DeckList;
