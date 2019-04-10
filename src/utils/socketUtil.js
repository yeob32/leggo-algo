import socketIOClient from 'socket.io-client';

let socket;

export function init( url ) {
  console.log( 'socket server init !' );
  socket = socketIOClient( url );
}

export default function() {
  return socket;
}
