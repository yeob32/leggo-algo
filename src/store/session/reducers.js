import { SAVE, UPDATE, GET, REMOVE } from './actions';

const initialState = {
  id: '',
  name: '',
};

export default function session( state = initialState, action ) {
  switch ( action.type ) {
    case SAVE:
      return {
        ...action.session,
      };
    case GET:
      return {
        ...state.payload,
      };
    case REMOVE:
      return {
        session: state.messages.filter( message => message.timestamp !== action.meta.timestamp ),
      };
    default:
      return state;
  }
}
