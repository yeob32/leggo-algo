import { SAVE, UPDATE, GET, REMOVE } from './types';

export function getSession( sessionId ) {
  console.log( 'action > ', sessionId );
  return {
    type: GET,
    payload: sessionId,
  };
}

export function deleteMessage( timestamp ) {
  return {
    type: REMOVE,
    meta: {
      timestamp,
    },
  };
}
