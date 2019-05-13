import React from 'react';

import { Button } from 'antd';
import Deck from '../components/Deck';

const ButtonGroup = Button.Group;

const DeckList = ( { member, pileCards } ) => {
  const { deck } = member;

  return (
    <div>
      <ButtonGroup>
        {deck.map( dck => (
          <Deck
            member={member}
            deck={dck}
            piles={pileCards}
            key={dck.id}
          />
        ) )}
      </ButtonGroup>
    </div>
  );
};

export default DeckList;
