import { SAVE, UPDATE, GET, REMOVE } from './actions';

const initialState = {
  id: null,
  name: '',
};

export default function session( state = initialState, action ) {
  switch ( action.type ) {
    case SAVE:
      console.log( 'reducers SAVE >>>>>>>>>>>>>>>>>>> ', state, action );

      return {
        ...action.session,
      };
    case GET:
      console.log( 'reducers GET >>>>>>>>>>>>>>>>>>> ', state, action );

      return {
        ...state.payload,
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
