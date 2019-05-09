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

  /**
   * 세션은 그냥 세션임 게임 참여 사용자 수와 상관없다.
   * 게임 참여 시 사용자 id, name 받아서 게임 사용자 데이터 새로 만듬
   */
  socket.on( 'join', function( id, name ) {
    const memberList = gameService.getMemberList();

    const alreadyJoinCheck = memberList.filter( member => member.id === id ).length === 0;
    if ( alreadyJoinCheck ) {
      gameService.initMember( id, name );
    }

    io.emit( 'member-list', memberList );
    io.emit( 'join' );
    io.emit( 'join-message', { code: 200, name, message: name + '님이 참가함' } );
  } );

  // 초기 참여인원 가져와서 렌더링
  socket.on( 'member-list', function() {
    io.emit( 'member-list', gameService.getMemberList() );
  } );

  socket.on( 'init', function() {
    gameService.init();

    io.emit( 'init', gameStatus );
  } );

  // 시작
  socket.on( 'start', function( data ) {
    gameService.start();

    if ( data ) {
      // socket.broadcast.emit( 'start', gameStatus );
      io.emit( 'start', gameStatus );
    }
  } );

  // 모든 소켓 콜백은 game object 반환
  socket.on( 'card-select', function( data ) {
    io.emit( 'start', gameStatus );
  } );

  socket.on( 'exit', function( data ) {
    gameService.exit( data );

    io.emit( 'exit', { code: 200, id: data, message: data + '님이 나감' } );
    io.emit( 'member-list', gameService.getMemberList() );
  } );

  // 접속 종료
  socket.on( 'disconnect', function( id ) {
    gameService.disconnect( id );

    io.emit( 'member-list', gameService.getMemberList() );
  } );
}
