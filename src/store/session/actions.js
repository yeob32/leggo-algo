export const SAVE = 'SAVE';
export const UPDATE = 'UPDATE';
export const GET = 'GET';
export const REMOVE = 'REMOVE';

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
