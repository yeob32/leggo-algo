import React from 'react';

import { Button } from 'antd';
import Deck from '../components/Deck';

const ButtonGroup = Button.Group;

const DeckList = ( { decks, pileCards } ) => {
  return (
    <div>
      <ButtonGroup>
        {decks.map( deck => (
          <Deck deck={deck} piles={pileCards} key={deck.id} />
        ) )}
      </ButtonGroup>
    </div>
  );
};

export default DeckList;
