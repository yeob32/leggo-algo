import { UPDATE, GET_CURRENT_USER } from './actions.js';

import cardData from '../../static/cards';

const initialState = {
  status: 'ready',
  deal: false,
  cards: cardData,
  discardHolder: [], //
  pileCards: cardData, // 남은 카드
  members: [],
};

export default function gameReducer( state = initialState, action ) {
  switch ( action.type ) {
    case UPDATE:
      return Object.assign( {}, state, action.payload );
    case GET_CURRENT_USER:
      return action.payload.members.find( mem => mem.id === action.payload.id );

    default:
      return state;
  }
}
