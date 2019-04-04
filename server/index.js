const app = require( 'express' )();
const server = require( 'http' ).Server( app );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const io = require( 'socket.io' )( server );
const path = require( 'path' );
const router = require( './route' );
const sessionConfig = require( './session' );

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

io.on( 'connection', function( socket ) {
  socket.on( 'join', function( name ) {
    // 클라이언트에서 id 전달받아서 배열에 푸시 => redux dispatch - join user list => render
    io.emit( 'join', name );
  } );
} );

server.listen( 3001, function() {
  console.log( 'listening on *:3001' );
} );
