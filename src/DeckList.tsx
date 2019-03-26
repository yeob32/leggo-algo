import React from 'react';

import { Button } from 'antd';
import Deck from './Deck';

const ButtonGroup = Button.Group;

interface Props {
  decks: [{ id: string; name: string; flip: boolean }];
  pileCards: [{ id: string; name: string }];
}

const DeckList: React.SFC<Props> = ({ decks, pileCards }) => {
  return (
    <div>
      <ButtonGroup>
        {decks.map(deck => (
          <Deck deck={deck} piles={pileCards} key={deck.id} />
        ))}
      </ButtonGroup>
    </div>
  );
};

export default DeckList;
