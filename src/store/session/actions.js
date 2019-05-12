export const SAVE = 'session/SAVE';
export const UPDATE = 'session/UPDATE';
export const REMOVE = 'session/REMOVE';

export const INIT = 'session/INIT';

export const saveSession = session => {
  return { type: SAVE, session };
};

export const initSession = session => {
  return { type: INIT, session };
};

export function updateSession( data ) {
  return { type: UPDATE, data };
}
