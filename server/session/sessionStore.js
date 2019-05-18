const session = [];

const createSession = ( id, name ) => ( {
  id,
  name,
  deck: [],
  score: 0,
  enter: false,
  order: null,
  host: false,
  auth: {
    random: false, // 랜덤 카드 선택
    check: false, // true면 턴
    hold: false, // true면 턴
  },
  turn: false,
} );

function saveSession( { id, name } ) {
  const sessionData = getSession( id );

  if ( sessionData ) {
    return;
  }

  const sessionObject = createSession( id, name );
  if ( session.length === 0 ) {
    // 참가 할 때 방장 여부 결정
    // sessionObject.host = true;
  }

  session.push( sessionObject );

  return sessionObject;
}

function getSession( id ) {
  return session.find( data => data.id === id );
}

function getSessionList() {
  return session;
}

function removeSession( id ) {
  const sessionIndex = session.findIndex( s => s.id === id );
  if ( sessionIndex > -1 ) {
    console.log( 'remove session > ', id );
    return session.splice( sessionIndex, 1 );
  }
}

function updateSessionActionData( id, action ) {
  session.forEach( ss => {
    if ( ss.id === id ) {
      let auth = ss.auth;
      auth = Object.assign( {}, ss.auth, action );
    }
  } );
}

function updateSession( id ) {
  return session.filter( s => s.id !== id );
}

module.exports = {
  session,
  saveSession,
  getSession,
  getSessionList,
  removeSession,
  updateSessionActionData,
};
