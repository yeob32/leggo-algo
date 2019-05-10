const express = require( 'express' );
const app = express();
const server = require( 'http' ).Server( app );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const io = require( 'socket.io' )( server );
const path = require( 'path' );
const router = require( './route' );
const sessionConfig = require( './session' );
const sessionStore = require( './session/sessionStore' );
const gameStatus = require( './game' );
const gameService = require( './game/gameService' );

app.use( cors() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
// app.use( sessionConfig );

// app.use( express.static( path.join( __dirname, 'public' ) ) );

// app.use( function( req, res, next ) {
//   // if ( !req.session.rds ) {
//   //   req.session.rds = [];
//   // }

//   next();
// } );

app.use( router );

server.listen( 3001, function() {
  console.log( 'listening on *:3001' );
} );

io.on( 'connection', onConnect );

const allClients = [];

function onConnect( socket ) {
  allClients.push( socket );

  socket.on( 'test', function( data ) {
    socket.emit( 'request' /* */ ); // emit an event to the socket
    io.emit( 'broadcast' /* */ ); // emit an event to all connected sockets

    const si = setInterval( () => {}, 1000 );
    clearInterval( si );
  } );

  socket.on( 'say to someone', function( id, msg ) {
    socket.broadcast.to( id ).emit( 'my message', msg );
  } );

  /**
   **************
   */

  // 게임 상태 반환
  socket.on( 'get-game-status', function() {
    io.emit( 'get-game-status-result', gameStatus );
  } );

  // 참여
  socket.on( 'join', function( session ) {
    if ( !gameService.checkAleadyJoinMemeber( session ) ) {
      return;
    }

    gameService.initMember( session.id, session.name );

    io.emit( 'join-result', {
      code: 200,
      item: gameStatus,
      message: session.name + '님이 참가함',
    } );
  } );

  // 시작
  socket.on( 'start', function( data ) {
    gameService.start();

    io.emit( 'start', gameStatus );
  } );

  // 나가기
  socket.on( 'exit', function( data ) {
    gameService.exit( data );

    io.emit( 'exit-result', {
      code: 200,
      item: gameStatus,
      message: data + '님이 나감',
    } );
  } );

  // 모든 소켓 콜백은 game object 반환
  socket.on( 'card-select', function( data ) {
    io.emit( '', gameStatus );
  } );

  // 접속 종료
  socket.on( 'disconnect', function() {
    console.log( 'Got disconnect! > ' );

    socket.disconnect( 0 );
    const i = allClients.indexOf( socket );
    allClients.splice( i, 1 );

    io.emit( 'disconnect-result', gameStatus );
  } );
}
