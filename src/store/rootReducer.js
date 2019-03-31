import { combineReducers } from 'redux';

import sessionReducer from './session/reducers';

const rootReducer = combineReducers( {
  session: sessionReducer,
} );

export default rootReducer;
