export const SAVE = 'SAVE';
export const UPDATE = 'UPDATE';
export const GET = 'GET';
export const REMOVE = 'REMOVE';

export const saveSession = session => {
  console.log( 'action session > ', session );
  return { type: SAVE, session };
};

export const getSession = () => {
  console.log( 'action > ' );
  return {
    type: GET,
  };
};
