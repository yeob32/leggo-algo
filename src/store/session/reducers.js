import { SAVE, UPDATE, GET, REMOVE } from './types';

const initialState = {
  session: {
    id: 1,
    name: 'test user',
  },
};

export default function session( state = initialState, action ) {
  console.log( 'reducers > ', state, action );
  switch ( action.type ) {
    case GET:
      console.log( 'reducers > action.type', action.type );
      return {
        session: state.session,
      };
    case REMOVE:
      return {
        session: state.messages.filter( message => message.timestamp !== action.meta.timestamp ),
      };
    default:
      return state;
  }
}
