const app = require( 'express' )();
const server = require( 'http' ).Server( app );
// const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );

const io = require( 'socket.io' )( server );
const path = require( 'path' );

const session = require( 'express-session' );

const currentUsers = [];

// app.use( cors() ); //yarn add cors

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

io.on( 'connection', function( socket ) {
  socket.on( 'join', function( msg ) {
    // 클라이언트에서 id 전달받아서 배열에 푸시
    // currentUsers.push( { id: 'testId', name: 'testName' } );
    io.emit( 'join', { id: 'testId', name: 'testName' } );
  } );
} );

// io.on("connection", function(socket) {
//   socket.emit("news", { hello: "world" });
//   socket.on("my other event", function(data) {
//     console.log(data);
//   });
// });

app.use(
  session( {
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
  } ),
);

app.all( '/*', function( req, res, next ) {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS' );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  );

  next();
} );

app.use( function( req, res, next ) {
  if ( !req.session.users ) {
    req.session.users = {};
  }

  next();
} );

app.get( '/', function( req, res ) {
  res.sendFile( path.resolve( __dirname, 'index.html' ) );
} );

app.post( '/login', function( req, res ) {
  const id = req.body.id;
  const password = req.body.password;

  currentUsers.push( { id, password } );
  req.session.users = { id, password };
  res.json( { code: '200', message: 'success' } );
} );

app.get( '/users', function( req, res ) {
  res.json( { session: req.session.users, currentUsers } );
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

server.listen( 3001, function() {
  console.log( 'listening on *:3001' );
} );
