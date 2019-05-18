import socketIOClient from 'socket.io-client';

let socket;

export function initSocket( url ) {
  console.log( '!socket > ', !socket );
  if ( !socket ) {
    console.log( 'socket server init !!' );
    socket = socketIOClient( url );
  }
}

export function existSocket() {
  console.log( 'socket > ', socket );
}

export function closeSocket() {
  socket = null;
}

export default function() {
  return socket;
}
