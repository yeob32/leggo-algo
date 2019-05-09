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
  // console.log( 'socket > ', socket );
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
   * 세션은 그냥 세션임 게임 참여 사용자 수와 상관없다.
   * 게임 참여 시 사용자 id, name 받아서 게임 사용자 데이터 새로 만듬
   */
  socket.on( 'join', function( session ) {
    const memberList = gameService.getMemberList();

    const alreadyJoinCheck = memberList.filter( member => member.id === session.id ).length === 0;
    if ( alreadyJoinCheck ) {
      gameService.initMember( session.id, session.name );
    }

    // 뭔가 message emit 을 공통으로 만들까
    io.emit( 'join-result', { code: 200, item: memberList, message: session.name + '님이 참가함' } );
  } );

  // 초기 참여인원 가져와서 렌더링
  socket.on( 'get-member-list', function() {
    io.emit( 'get-member-list-result', gameService.getMemberList() );
  } );

  socket.on( 'init', function() {
    // gameService.init();

    socket.emit( 'init-test1', 'this is socket.emit' );
    io.emit( 'init-test2', 'this is io.emit' );
    // io.emit( 'init', gameStatus );
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
    io.emit( '', gameStatus );
  } );

  socket.on( 'exit', function( data ) {
    gameService.exit( data );

    io.emit( 'exit-result', {
      code: 200,
      item: gameService.getMemberList(),
      message: data + '님이 나감',
    } );
  } );

  // 접속 종료
  socket.on( 'disconnect', function() {
    console.log( 'Got disconnect! > ' );
    const i = allClients.indexOf( socket );
    allClients.splice( i, 1 );

    io.emit( 'disconnect-result', gameService.getMemberList() );
  } );
}
