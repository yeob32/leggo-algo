const app = require( 'express' )();
const server = require( 'http' ).Server( app );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const io = require( 'socket.io' )( server );
const path = require( 'path' );
const router = require( './route' );
const sessionConfig = require( './session' );
const sessionStore = require( './session/sessionStore' );
const gameStatus = require( './game' );

app.use( cors() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( sessionConfig );

app.use( function( req, res, next ) {
  if ( !req.session.rds ) {
    req.session.rds = [];
  }

  next();
} );

app.use( router );

server.listen( 3001, function() {
  console.log( 'listening on *:3001' );
} );

io.on( 'connection', onConnect );

function onConnect( socket ) {
  socket.on( 'test', function( data ) {
    socket.emit( 'request' /* */ ); // emit an event to the socket
    io.emit( 'broadcast' /* */ ); // emit an event to all connected sockets

    const si = setInterval( () => {}, 1000 );
    clearInterval( si );
  } );

  socket.on( 'say to someone', function( id, msg ) {
    socket.broadcast.to( id ).emit( 'my message', msg );
  } );

  socket.on( 'join', function( id, name ) {
    const sessionCount = sessionStore.getSessionList().length;
    if ( sessionCount === 0 ) {
    }

    sessionStore.initSession( id, name );
    gameStatus.members.push( sessionStore.getSession( id ) );

    io.emit( 'user-list', sessionStore.getSessionList() );
  } );

  socket.on( 'check-user-list', function() {
    io.emit( 'user-list', sessionStore.getSessionList() );
  } );

  socket.on( 'disconnect-user', function( id ) {
    sessionStore.removeSession( id );
    console.log( 'disconnected user > ', id );
  } );

  socket.on( 'init-deck', function() {} );
}
