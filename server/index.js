const app = require( 'express' )();
const server = require( 'http' ).Server( app );
const io = require( 'socket.io' )( server );
const path = require( 'path' );

const session = require( 'express-session' );

const currentUsers = [];

app.use(
  session( {
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
  } ),
);

app.use( function( req, res, next ) {
  if ( !req.session.users ) {
    req.session.users = {};
  }

  next();
} );

app.get( '/', function( req, res ) {
  res.sendFile( path.resolve( __dirname, 'index.html' ) );
} );

app.get( '/login', function( req, res ) {
  const result = {};
  result.message = 'success';
  currentUsers.push( { id: 'testId', name: 'testName' } );
  req.session.users = { id: 'testId', name: 'testName' };
  res.json( result );
} );

app.get( '/me', function( req, res ) {
  res.json( { session: req.session, currentUsers } );
} );

app.get( '/logout', function( req, res ) {
  req.session.destroy( function( err ) {
    // cannot access session here
    res.json( { message: 'logout' } );
  } );
} );

app.get( '/test', function( req, res ) {
  res.sendFile( path.resolve( __dirname, 'test.html' ) );
} );

io.on( 'connection', function( socket ) {
  socket.on( 'join', function( msg ) {
    // 클라이언트에서 id 전달받아서 배열에 푸시
    // currentUsers.push( { id: 'testId', name: 'testName' } );
    io.emit( 'join', { id: 'testId', name: 'testName' } );
  } );

  socket.on( 'chat message', function( msg ) {
    console.log( 'msg > server > on', msg );
    io.emit( 'chat message', msg );
  } );

  socket.on( 'test', function( msg ) {
    console.log( 'test > server > on', msg );
    io.emit( 'test', msg );
  } );
} );

// io.on("connection", function(socket) {
//   socket.emit("news", { hello: "world" });
//   socket.on("my other event", function(data) {
//     console.log(data);
//   });
// });

server.listen( 3001, function() {
  console.log( 'listening on *:3001' );
} );
