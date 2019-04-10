import { SAVE, UPDATE, GET, REMOVE } from './actions';

const initialState = {
  session: {
    id: null,
    name: '',
  },
};

export default function session( state = initialState, action ) {
  switch ( action.type ) {
    case SAVE:
      console.log( 'reducers >>>>>>>>>>>>>>>>>>> ', state, action );

      return {
        session: state.session,
      };
    case GET:
      console.log( 'reducers >>>>>>>>>>>>>>>>>>> ', state, action );

      return {
        session: state.session,
      };
    case REMOVE:
      return {
        session: state.messages.filter( message => message.timestamp !== action.meta.timestamp ),
      };
    default:
      console.log( 'reducers default >>>>>>>>>>>>>>>>>>> ', state, action );
      return state;
  }
}
