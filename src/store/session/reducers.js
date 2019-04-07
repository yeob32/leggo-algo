import { SAVE, UPDATE, GET, REMOVE } from './types';

const initialState = {
  session: {
    id: null,
    name: '',
  },
};

export default function session( state = initialState, action ) {
  console.log( 'reducers > ', state, action );
  switch ( action.type ) {
    case SAVE:
      console.log( 'reducers > action.type', action.type );
      console.log( 'state > ', state );
      return {
        session: state.session,
      };
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
