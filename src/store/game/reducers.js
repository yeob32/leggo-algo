import { UPDATE } from './actions.js';

const initialState = {
  status: 'ready',
  deal: false,
  cards: [],
  discardHoleder: [],
  pileCards: [],
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
