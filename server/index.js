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

    socket.emit( 'update-session', gameStatus.members );
    io.emit( 'game-status', { item: gameStatus, message: session.name + '님이 참가함' } );
  } );

  // 시작
  socket.on( 'start', function( data ) {
    gameService.start();

    io.emit( 'update-session', gameStatus.members );
    io.emit( 'game-status', { item: gameStatus, message: '게임 시작!!' } );
  } );

  // 나가기
  socket.on( 'exit', function( session ) {
    gameService.exit( session.id );

    socket.emit( 'exit-result', gameStatus.members );
    io.emit( 'game-status', { item: gameStatus, message: session.name + '님이 나감' } );
  } );

  socket.on( 'action', function( type, data ) {
    const { id, targetId, cardId } = data;
    let message = '';

    console.log( 'action > ', type, data );

    switch ( type ) {
      case 'random': // 랜덤카드
        const result = cardId
          ? gameService.randomCardAction( id, cardId )
          : gameService.randomCardAction( id );

        gameService.updateAuthAction( id, { random: true } ); // 액션 상태 변경
        message = '카드 게또';

        socket.emit( 'personal-message', result.name + ' 카드 게또!' );
        break;
      case 'check': // 상대카드 뒤집기
        gameService.updateDeckAction( targetId, cardId );
        gameService.updateAuthAction( id, { check: true } );
        // 클라이언트에서는 end 가 false 니까 turnOver , end 호출 가능하게 하면 됨 ,,, random은 호출 안되지
        break;
      case 'end': // 턴종료
        gameService.updateAuthAction( id, { end: true } );
        gameService.orderStack();

        message = '턴 종료!';
        break;

      default:
    }

    // 카드 정렬 하자

    // 다음 액션 체크 ex) 상대 카드 뒤집기, 턴 종료
    // 점수 계산
    // 다음 턴

    socket.emit( 'update-session', gameStatus.members );
    io.emit( 'game-status', { item: gameStatus, message } );
  } );

  // 모든 소켓 콜백은 game object 반환
  socket.on( 'card-select', function( data ) {
    io.emit( '', gameStatus );
  } );

  // 접속 종료
  // socket.on( 'disconnect', function() {
  //   console.log( 'Got disconnect! > ' );

  //   socket.disconnect( 0 );
  //   const i = allClients.indexOf( socket );
  //   allClients.splice( i, 1 );

  //   io.emit( 'disconnect-result', gameStatus );
  // } );
}
