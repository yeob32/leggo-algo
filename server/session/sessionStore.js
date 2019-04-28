const session = [];

const createSession = ( id, name ) => ( {
  id,
  name,
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
} );

function saveSession( { id, name } ) {
  const sessionData = getSession( id );

  if ( sessionData ) {
    return;
  }

  const sessionObject = createSession( id, name );
  if ( session.length === 0 ) {
    sessionObject.super.host = true;
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
  return session.filter( s => s.id !== id );
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
};
