import { SAVE, UPDATE, GET, REMOVE, INIT } from './actions';

const initialState = {
  id: '',
  name: '',
  deck: [],
  score: 0,
  enter: false,
  order: null,
  super: {
    host: false,
    check: false, // true면 턴
    hold: false, // true면 턴
  },
  turn: false,
};

export default function session( state = initialState, action ) {
  switch ( action.type ) {
    case SAVE:
      return {
        ...action.session,
      };
    case INIT:
      return {
        ...action.session,
        ...state,
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
