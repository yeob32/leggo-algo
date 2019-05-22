import { SAVE, UPDATE, REMOVE, INIT } from './actions';

const initialState = {
  id: '',
  name: '',
  deck: [],
  score: 0,
  enter: false,
  order: null,
  host: false,
  auth: {
    random: false,
    check: false, // true면 턴
    hold: false, // true면 턴
  },
  turn: false,
};

export default function sessionReducer( state = initialState, action ) {
  switch ( action.type ) {
    case SAVE:
      localStorage.setItem( 'sessionId', action.session.id );

      return {
        ...action.session,
      };
    case INIT:
      return {
        ...initialState,
        id: state.id,
        name: state.name,
      };
    case UPDATE:
      if ( !action.data || action.data.length === 0 ) {
        return initialState;
      }

      // updateSession => 다른유저가 요청시에도 탄다고
      return action.data.find( member => member.id === state.id )
        ? action.data.find( member => member.id === state.id )
        : state;
    case REMOVE:
      return {
        session: state.messages.filter( message => message.timestamp !== action.meta.timestamp ),
      };
    default:
      return state;
  }
}
