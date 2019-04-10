const createSession = ( id, name ) => ( {
  id,
  name,
  deck: [],
  score: 0,
  enter: false,
  order: null,
  super: {
    chief: false,
    check: false, // true면 턴
    hold: false, // true면 턴
  },
  turn: false,
} );

const session = [];

function initSession( id, name ) {
  session.push( createSession( id, name ) );
}

function getSession( id ) {
  return session.find( data => data.id === id );
}

function getSessionList() {
  return session;
}

module.exports = {
  initSession,
  getSession,
  getSessionList,
};
