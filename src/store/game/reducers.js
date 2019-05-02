import { UPDATE } from './actions.js';

import cardData from '../../static/cards';

const initialState = {
  status: 'ready',
  deal: false,
  cards: cardData,
  discardHolder: [], //
  pileCards: cardData, // 남은 카드
  members: [],
};

export default function game( state = initialState, action ) {
  switch ( action.type ) {
    case UPDATE:
      return {
        ...action.payload,
        state,
      };
    default:
      return state;
  }
}
