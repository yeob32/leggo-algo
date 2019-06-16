import { combineReducers } from 'redux';

import sessionReducer from './session/reducers';
import gameReducer from './game/reducers';
import modalReducer from './modal/reducers';

const rootReducer = combineReducers( {
  sessionReducer,
  gameReducer,
  modalReducer,
} );

export default rootReducer;
