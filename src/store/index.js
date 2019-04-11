import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from './loggerMiddleware';

import rootReducer from './rootReducer';

export default function configureStore() {
  const middlewares = [ thunkMiddleware, loggerMiddleware ];
  const middleWareEnhancer = applyMiddleware( ...middlewares );

  // const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  // const store = createStore(rootReducer, devTools);
  const store = createStore( rootReducer, composeWithDevTools( middleWareEnhancer ) );

  return store;
}
