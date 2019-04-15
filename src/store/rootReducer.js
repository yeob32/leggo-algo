import { combineReducers } from 'redux';

import sessionReducer from './session/reducers';
import gameReducer from './game/reducers';

const rootReducer = combineReducers( {
  session: sessionReducer,
  game: gameReducer,
} );

export default rootReducer;
