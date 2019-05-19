import React from 'react';

import { Button } from 'antd';
import Deck from '../components/Deck';

const ButtonGroup = Button.Group;

const DeckList = ( { member, pileCards, discardHolder } ) => {
  const { deck } = member;

  const excludedDiscardHolder = discardHolder.filter( dh =>
    member.deck.some( md => {
      return md.id === dh.id && !md.flip;
    } ),
  );
  const enableSelectCardList = excludedDiscardHolder.concat( pileCards );

  return (
    <div>
      <ButtonGroup>
        {deck.map( dck => (
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
