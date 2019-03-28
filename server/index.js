const app = require( 'express' )();
const server = require( 'http' ).Server( app );
const io = require( 'socket.io' )( server );

const path = require( 'path' );

app.get( '/', function( req, res ) {
  res.sendFile( path.resolve( __dirname, 'index.html' ) );
} );

io.on( 'connection', function( socket ) {
  socket.on( 'chat message', function( msg ) {
    console.log( 'msg > ', msg );
    io.emit( 'chat message', msg );
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
