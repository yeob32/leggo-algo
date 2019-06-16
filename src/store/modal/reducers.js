import { TOGGLE } from './actions.js';

const initialState = {
  visible: false,
};

export default function modalReducer( state = initialState, action ) {
  switch ( action.type ) {
    case TOGGLE:
      return Object.assign( {}, state, action.visible );
    default:
      return state;
  }
}
