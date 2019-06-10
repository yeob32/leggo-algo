/* eslint-disable no-case-declarations */
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
  socket.on( 'game-status', function() {
    io.emit( 'game-status', { item: gameStatus } );
  } );

  // 참여
  socket.on( 'join', function( session ) {
    if ( !gameService.checkAleadyJoinMember( session ) ) {
      return;
    }

    gameService.initMember( session.id, session.name );

    socket.emit( 'update-session', { item: gameStatus.members } );
    io.emit( 'game-status', { item: gameStatus, message: session.name + '님이 참가함' } );
  } );

  // 시작
  socket.on( 'start', function( data ) {
    gameService.start();

    io.emit( 'update-session', { item: gameStatus.members } );
    io.emit( 'game-status', { item: gameStatus, message: '게임 시작!!' } );
  } );

  // 나가기
  socket.on( 'exit', function( session ) {
    if ( !session.id ) {
      return;
    }

    gameService.exit( session.id );

    socket.emit( 'exit-result', gameStatus.members );
    io.emit( 'game-status', { item: gameStatus, message: session.name + '님이 나감' } );
  } );

  socket.on( 'action-random', function( data ) {
    const { id, cardId } = data;
    let message;

    const result = cardId
      ? gameService.randomCardAction( id, cardId )
      : gameService.randomCardAction( id );

    gameService.updateAuthAction( id, { random: true } ); // 액션 상태 변경
    message = '카드 게또';

    socket.emit( 'update-session', { item: gameStatus.members, pm: result.name + ' 카드 게또!' } );
    io.emit( 'game-status', { item: gameStatus, message } );
  } );

  socket.on( 'action-check', function( type, data ) {
    const { id, targetMemberId, cardId } = data;

    switch ( type ) {
      case 'success': // 상대카드 뒤집기
        gameService.updateDeckAction( targetMemberId, cardId );
        gameService.updateAuthAction( id, { check: true } );

        break;
      case 'fail': // 상대카드 뒤집기
        // gameService.tempToPile(id)
        // temp 오브젝트 제거하고 member.deck 에서 temp 카드 찾아서 flip => true

        gameService.orderStack();
        gameService.updateAuthAction( id, { hold: false, check: false, random: false } );
        gameService.updateTurnAction( id, false );
        gameService.tempToPile( id );
        // 클라이언트에서는 end 가 false 니까 turnOver , end 호출 가능하게 하면 됨 ,,, random은 호출 안되지

        break;
      default:
    }

    io.emit( 'update-session', { item: gameStatus.members } );
    io.emit( 'game-status', { item: gameStatus } );
  } );

  socket.on( 'action-hold', function( data ) {
    const { id } = data;

    gameService.orderStack();
    gameService.updateAuthAction( id, { hold: false, check: false, random: false } );
    gameService.updateTurnAction( id, false );

    socket.emit( 'update-session', { item: gameStatus.members } );
    io.emit( 'game-status', { item: gameStatus, message: '패스 ~~~' } );
  } );

  socket.on( 'end', function() {
    io.emit( 'game-status', { item: gameStatus, message: '게임 종료' } ); // 게임 결과 리턴
    io.emit( 'end' );
  } );

  socket.on( 'destroy-session', function( session ) {
    if ( !session.id ) {
      return;
    }

    gameService.exit( session.id );
    sessionStore.removeSession( session.id ); // 일단 ssr 이나 로컬스토리 같은 걸 안쓰니까 초기화 시킴

    socket.emit( 'exit-result', gameStatus.members );
    io.emit( 'game-status', { item: gameStatus, message: session.name + '님이 나감' } );
  } );

  // 접속 종료
  socket.on( 'disconnect', function() {
    socket.disconnect( 0 );
    const i = allClients.indexOf( socket );
    allClients.splice( i, 1 );

    if ( sessionStore.getSessionList().length === 0 ) {
      gameService.initGameStatus();
    }

    // io.emit( 'disconnect-result', gameStatus );
  } );
}
