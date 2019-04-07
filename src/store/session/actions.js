import { SAVE, UPDATE, GET, REMOVE } from './types';

export function saveSession( session ) {
  console.log( 'action > ', session );
  return {
    type: SAVE,
    payload: session,
  };
}

export function getSession() {
  console.log( 'action > ' );
  return {
    type: GET,
  };
}
